import * as jwt from "@tsndr/cloudflare-worker-jwt";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://limelightsmp.com", // Set to "*" for local testing
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// --- Helper to Clean Private Key ---
function cleanPrivateKey(env) {
  return env.FIREBASE_PRIVATE_KEY
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "")
    .trim();
}

// --- Extract slug from request ---
async function getSlug(request) {
  const url = new URL(request.url);
  let slug = url.searchParams.get("slug");
  if (!slug && request.method === "POST") {
    const body = await request.clone().json().catch(() => ({}));
    slug = body.slug;
  }
  return slug;
}

export default {
  async fetch(request, env) {
    console.log("PRIVATE_KEY exists?", !!env.FIREBASE_PRIVATE_KEY);
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      if (request.method === "OPTIONS") {
        return new Response(null, { headers: CORS_HEADERS });
      }

      // Comments
      if (path === "/comments" && request.method === "POST") {
        return await handleComment(request, env);
      }
      if (path === "/comments" && request.method === "GET") {
        return await getComments(request, env);
      }

      // Likes
      if (path === "/likes" && request.method === "POST") {
        return await handleLike(request, env);
      }
      if (path === "/likes" && request.method === "GET") {
        return await getLikes(request, env);
      }

      return new Response("Not Found", { status: 404, headers: CORS_HEADERS });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }
  },
};

async function getAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);
  const jwtPayload = {
    iss: env.FIREBASE_CLIENT_EMAIL,
    sub: env.FIREBASE_CLIENT_EMAIL,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/datastore",
  };

  const privateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const signedJwt = await jwt.sign(jwtPayload, privateKey, {
    algorithm: "RS256",
    header: {
      alg: "RS256",
      typ: "JWT",
    },
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signedJwt}`,
  });

  const data = await response.json();
  console.log("Access token response:", data);

  if (!response.ok) {
    throw new Error(data.error_description || data.error || "Failed to get access token");
  }

  return data.access_token;
}


// --- Ensure Post Document Exists ---

async function ensurePostDocument(slug, env, accessToken) {
  const postDocUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}`;
  const res = await fetch(postDocUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    await fetch(postDocUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { createdAt: { timestampValue: new Date().toISOString() } },
      }),
    });
  }
}

// --- Handle Comments ---
async function handleComment(request, env) {
  try {
    const body = await request.clone().json();
    console.log("Received comment payload:", body);

    const { slug, name, email, message, token } = body;

    if (!slug || !token) {
      console.log("Missing slug or token");
      return new Response(JSON.stringify({ error: "Missing slug or token" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Verify reCAPTCHA
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET}&response=${token}`,
      { method: "POST" }
    );
    const verifyData = await recaptchaRes.json();
    console.log("reCAPTCHA response:", verifyData);

    if (
      !verifyData.success ||
      verifyData.action !== "submit_comment" ||
      verifyData.score < 0.5
    ) {
      console.log("reCAPTCHA failed:", verifyData);
      return new Response(JSON.stringify({ error: "Invalid reCAPTCHA" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const accessToken = await getAccessToken(env);
    await ensurePostDocument(slug, env, accessToken);

    // Add comment to Firestore
    const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}/comments?documentId=${Date.now()}`;
    const firestoreBody = {
      fields: {
        name: { stringValue: name },
        email: { stringValue: email },
        message: { stringValue: message },
        timestamp: { timestampValue: new Date().toISOString() },
      },
    };

    const firestoreRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(firestoreBody),
    });

    if (!firestoreRes.ok) {
      const errorText = await firestoreRes.text();
      console.log("Firestore error:", errorText);
      return new Response(errorText, {
        status: firestoreRes.status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in handleComment:", err.stack || err.message || err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
}


// --- Get Comments ---
async function getComments(request, env) {
  const slug = await getSlug(request);
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const accessToken = await getAccessToken(env);
  await ensurePostDocument(slug, env, accessToken);

  const commentsUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}/comments`;
  const res = await fetch(commentsUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return new Response(await res.text(), {
      status: res.status,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const data = await res.json();
  const comments = (data.documents || []).map((doc) => ({
    name: doc.fields.name.stringValue,
    message: doc.fields.message.stringValue,
    timestamp: doc.fields.timestamp.timestampValue,
  }));

  return new Response(JSON.stringify({ success: true, comments }), {
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

// --- Get Likes ---
async function getLikes(request, env) {
  const slug = await getSlug(request);
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const accessToken = await getAccessToken(env);
  const likeDocUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}/likes/likeCount`;

  const getRes = await fetch(likeDocUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!getRes.ok) {
    return new Response(JSON.stringify({ likes: 0 }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const data = await getRes.json();
  const count = data.fields?.count?.integerValue
    ? parseInt(data.fields.count.integerValue, 10)
    : 0;
  return new Response(JSON.stringify({ likes: count }), {
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

// --- Handle Like ---
async function handleLike(request, env) {
  const slug = await getSlug(request);
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const accessToken = await getAccessToken(env);
  const likeDocUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}/likes/likeCount`;

  let currentLikes = 0;
  const getRes = await fetch(likeDocUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (getRes.ok) {
    const data = await getRes.json();
    if (data.fields && data.fields.count) {
      currentLikes = parseInt(data.fields.count.integerValue, 10);
    }
  } else {
    // Initialize likeCount document
    await fetch(likeDocUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { count: { integerValue: 0 } } }),
    });
  }

  // Increment like count
  const body = { fields: { count: { integerValue: currentLikes + 1 } } };
  await fetch(`${likeDocUrl}?updateMask.fieldPaths=count`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return new Response(
    JSON.stringify({ success: true, likes: currentLikes + 1 }),
    { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
  );
}
