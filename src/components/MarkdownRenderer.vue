<script setup>
import MarkdownIt from 'markdown-it';
import { computed } from 'vue';
import 'github-markdown-css/github-markdown.css'; // Import GitHub Markdown Styles

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

// Configure markdown-it
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const compiledMarkdown = computed(() => md.render(props.content));
</script>

<template>
  <!-- Apply GitHub markdown class -->
  <div class="markdown-body" v-html="compiledMarkdown"></div>
</template>

<style scoped>
/* Optional tweaks to match your dark/light theme */
.markdown-body {
  padding: 1rem;
  background-color: transparent;
  /* Keep it transparent to match theme */
  color: inherit;
  /* Use theme text color */
}

.markdown-body pre {
  background-color: #1e1e1e;
  /* Dark theme code blocks */
  color: #f8f8f2;
  padding: 0.75rem;
  border-radius: 6px;
}
</style>
