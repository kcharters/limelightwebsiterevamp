import * as jwt from "@tsndr/cloudflare-worker-jwt";

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "https://limelightsmp.com", // Change to "*" for testing
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};
const privateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

export default {
	async fetch(request, env) {
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

// --- Firestore Access Token ---
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
	const signedJwt = await jwt.sign(jwtPayload, privateKey, {
		algorithm: 'RS256',
		header: {
			alg: 'RS256',
			typ: 'JWT',
		},
	});

	const response = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signedJwt}`,
	});

	const data = await response.json();
	return data.access_token;
}

// --- Ensure Post Document Exists ---
async function ensurePostDocument(slug, env, accessToken) {
	const postDocUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}`;
	const res = await fetch(postDocUrl, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	if (!res.ok) {
		// Create the post document
		await fetch(postDocUrl, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fields: {
					createdAt: { timestampValue: new Date().toISOString() },
				},
			}),
		});
	}
}

// --- Handle Comments (POST) ---
async function handleComment(request, env) {
	const { slug, name, email, message, token } = await request.json();
	const accessToken = await getAccessToken(env);

	await ensurePostDocument(slug, env, accessToken);

	// Verify reCAPTCHA
	const verifyResponse = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET}&response=${token}`,
		{ method: "POST" }
	);
	const verifyData = await verifyResponse.json();
	if (!verifyData.success) {
		return new Response(JSON.stringify({ error: "Invalid reCAPTCHA" }), {
			status: 400,
			headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
		});
	}

	// Create comment
	const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}/comments?documentId=${Date.now()}`;
	const body = {
		fields: {
			name: { stringValue: name },
			email: { stringValue: email },
			message: { stringValue: message },
			timestamp: { timestampValue: new Date().toISOString() },
		},
	};

	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		return new Response(await res.text(), {
			status: res.status,
			headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
		});
	}

	return new Response(JSON.stringify({ success: true }), {
		headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
	});
}

// --- Fetch Comments (GET) ---
async function getComments(request, env) {
	const url = new URL(request.url);
	const slug = url.searchParams.get("slug");
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
	const comments = (data.documents || []).map((doc) => {
		return {
			name: doc.fields.name.stringValue,
			message: doc.fields.message.stringValue,
			timestamp: doc.fields.timestamp.timestampValue,
		};
	});

	return new Response(JSON.stringify({ success: true, comments }), {
		headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
	});
}

// --- Likes (POST) ---
async function handleLike(request, env) {
	const { slug } = await request.json();
	const accessToken = await getAccessToken(env);

	await ensurePostDocument(slug, env, accessToken);

	const likeDocUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}/likes`;

	// Get current like count
	let currentLikes = 0;
	const getRes = await fetch(likeDocUrl, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	if (getRes.ok) {
		try {
			const data = await getRes.json();
			if (data.fields && data.fields.count) {
				currentLikes = parseInt(data.fields.count.integerValue, 10);
			}
		} catch {
			console.log("No existing like document, initializing at 0");
		}
	} else {
		// Create like document if it doesn't exist
		await fetch(likeDocUrl, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fields: {
					count: { integerValue: 0 },
				},
			}),
		});
	}

	// Increment like count
	const body = {
		fields: {
			count: { integerValue: currentLikes + 1 },
		},
	};

	await fetch(`${likeDocUrl}?updateMask.fieldPaths=count`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	return new Response(JSON.stringify({ success: true, likes: currentLikes + 1 }), {
		headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
	});
}

// --- Likes (GET) ---
async function getLikes(request, env) {
	const url = new URL(request.url);
	const slug = url.searchParams.get("slug");
	const accessToken = await getAccessToken(env);

	await ensurePostDocument(slug, env, accessToken);

	const likeDocUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts/${slug}/likes`;

	let currentLikes = 0;
	const getRes = await fetch(likeDocUrl, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	if (getRes.ok) {
		const data = await getRes.json();
		if (data.fields && data.fields.count) {
			currentLikes = parseInt(data.fields.count.integerValue, 10);
		}
	}

	return new Response(JSON.stringify({ success: true, likes: currentLikes }), {
		headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
	});
}
