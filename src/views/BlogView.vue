<script setup>
import { ref, onMounted } from 'vue';
import ContentfulService from '@/services/ContentfulService';

const posts = ref([]);
const loading = ref(true);

onMounted(async () => {
    posts.value = await ContentfulService.getPosts();
    loading.value = false;
});
</script>

<template>
    <v-container>
        <h4 class="text-h4 mb-4">Blog</h4>

        <v-progress-circular v-if="loading" indeterminate color="primary" />

        <v-row v-else>
            <v-col v-for="post in posts" :key="post.sys.id" cols="12" md="6" lg="4">
                <v-card>
                    <v-img v-if="post.fields.coverImage?.fields?.file?.url"
                        :src="'https:' + post.fields.coverImage.fields.file.url" height="200" cover />
                    <v-card-title>{{ post.fields.title }}</v-card-title>
                    <v-card-text>{{ post.fields.excerpt }}</v-card-text>
                    <v-card-actions>
                        <v-btn :to="`/blog/${post.fields.slug}`" variant="outlined" color="primary">
                            Read More
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
