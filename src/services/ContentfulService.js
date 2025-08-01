import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export default {
  async getPosts() {
    try {
      const entries = await client.getEntries({ content_type: 'post', order: '-sys.createdAt' });
      return entries.items;
    } catch (err) {
      console.error('Error fetching posts from Contentful:', err);
      return [];
    }
  },

  async getPostBySlug(slug) {
    try {
      const entries = await client.getEntries({
        content_type: 'post',
        'fields.slug': slug,
        limit: 1
      });
      return entries.items.length > 0 ? entries.items[0] : null;
    } catch (err) {
      console.error('Error fetching single post:', err);
      return null;
    }
  }
};
