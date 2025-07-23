// src/services/ContentfulService.js
import { createClient } from 'contentful';
const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const client = createClient({
    space,          // Replace with your Space ID
    accessToken // Replace with your Content Delivery API key
});

export default {
    async getPosts() {
        try {
            const entries = await client.getEntries({ content_type: 'blogPost', order: '-sys.createdAt' });
            return entries.items;
        } catch (err) {
            console.error('Error fetching posts from Contentful:', err);
            return [];
        }
    },

    async getPostBySlug(slug) {
        try {
            const entries = await client.getEntries({
                content_type: 'blogPost',
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
