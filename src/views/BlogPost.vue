<template>
  <v-container class="blog-post" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-skeleton-loader v-if="loading" type="article" />

        <div v-else-if="post">
          <!-- Blog Title -->
          <h1 class="text-h3 font-bold mb-4">{{ post.fields.title }}</h1>

          <!-- Blog Image -->
          <v-img
            v-if="post.fields.featuredImage?.fields?.file?.url"
            :src="'https:' + post.fields.featuredImage.fields.file.url"
            alt="Blog Image"
            class="mb-6"
            max-height="400"
            cover
          />
          <!-- Author -->
          <p>Author: {{ post.fields.author }}</p>
          <!-- Publish Date -->
          <p>Date Published: {{ post.fields.publishedDate }}</p>

          <!-- Blog Content (Markdown) -->
          <MarkdownRenderer :content="post.fields.content" />
        </div>

        <v-alert v-else type="error"> Blog post not found. </v-alert>

        <!-- Social Features -->
        <div class="social-actions mt-6">
          <!-- Like Button -->
          <v-btn color="primary" @click="toggleLike">
            <v-icon left>mdi-thumb-up</v-icon>
            Like ({{ likes }})
          </v-btn>

          <!-- Share Buttons -->
          <div class="share-buttons mt-4">
            <v-btn color="secondary" @click="share('twitter')">
              <v-icon left>mdi-twitter</v-icon> Twitter
            </v-btn>
            <v-btn color="secondary" @click="share('facebook')">
              <v-icon left>mdi-facebook</v-icon> Facebook
            </v-btn>
          </div>
        </div>

        <!-- Comment Form -->
        <div class="comments-section mt-8">
          <h4 class="text-h5 mb-2">Comments</h4>
          <v-form @submit.prevent="submitComment">
            <v-text-field v-model="comment.name" label="Name" required />
            <v-text-field v-model="comment.email" label="Email" required type="email" />
            <v-textarea v-model="comment.message" label="Your Comment" required />
            <v-btn type="submit" color="primary">Post Comment</v-btn>
          </v-form>

          <!-- Display Comments -->
          <v-list two-line v-if="comments.length > 0" class="mt-4">
            <v-list-item v-for="(c, index) in comments" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ c.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ c.message }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-alert v-else type="info" class="mt-4"
            >No comments yet. Be the first!</v-alert
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";
import ContentfulService from "@/services/ContentfulService";

const { executeRecaptcha } = useReCaptcha();
const route = useRoute();

const post = ref(null);
const loading = ref(true);
const likes = ref(0);
const comments = ref([]);
const comment = ref({ name: "", email: "", message: "" });

const WORKER_URL = "https://nameless-wildflower-0069.kassixxgames.workers.dev";

// --- Fetch Blog Post ---
async function fetchPost() {
  try {
    const slug = route.params.slug;
    post.value = await ContentfulService.getPostBySlug(slug);
    await fetchLikes(slug);
    await fetchComments(slug);
  } catch (err) {
    console.error("Error fetching blog post:", err);
  } finally {
    loading.value = false;
  }
}

// --- Fetch Likes ---
async function fetchLikes(slug) {
  try {
    const res = await fetch(`${WORKER_URL}/likes?slug=${slug}`);
    const data = await res.json();
    likes.value = data.likes || 0;
  } catch (err) {
    console.error("Error fetching likes:", err);
  }
}

// --- Fetch Comments ---
async function fetchComments(slug) {
  try {
    const res = await fetch(`${WORKER_URL}/comments?slug=${slug}`);
    const data = await res.json();
    comments.value = data.comments || [];
  } catch (err) {
    console.error("Error fetching comments:", err);
  }
}

// --- Like Button ---
async function toggleLike() {
  try {
    const response = await fetch(`${WORKER_URL}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: route.params.slug }),
    });
    const data = await response.json();
    likes.value = data.likes;
  } catch (err) {
    console.error("Error liking post:", err);
  }
}

// --- Submit Comment ---
async function submitComment() {
  const token = await executeRecaptcha("submit_comment");

  if (!token) {
    alert("reCAPTCHA failed.");
    return;
  }

  try {
    const response = await fetch(`${WORKER_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: route.params.slug,
        ...comment.value,
        token,
      }),
    });
    const data = await response.json();
    if (data.success) {
      await fetchComments(route.params.slug); // Refresh comments
      comment.value = { name: "", email: "", message: "" };
    }
  } catch (err) {
    console.error("Error posting comment:", err);
  }
}

// --- Share Buttons ---
function share(platform) {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: document.title, url });
  } else {
    if (platform === "twitter") {
      window.open(`https://twitter.com/share?url=${encodeURIComponent(url)}`, "_blank");
    }
    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
    }
  }
}

onMounted(
  fetchPost,
  grecaptcha.ready(() => {
    console.log("reCAPTCHA v3 is ready");
  })
);
</script>

<style scoped>
.blog-post h1 {
  color: var(--v-theme-on-background, #fff);
}

.blog-post p {
  line-height: 1.6;
}
</style>
