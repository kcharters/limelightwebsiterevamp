<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ContentfulService from '@/services/ContentfulService';

const route = useRoute();
const post = ref(null);
const loading = ref(true);

onMounted(async () => {
    post.value = await ContentfulService.getPostBySlug(route.params.slug);
    loading.value = false;
});
</script>

<template>
    <v-container>
        <v-progress-circular v-if="loading" indeterminate color="primary" />
        <div v-else-if="post">
            <h1 class="text-h2">{{ post.fields.title }}</h1>
            <v-img v-if="post.fields.coverImage?.fields?.file?.url"
                :src="'https:' + post.fields.coverImage.fields.file.url" height="300" cover class="my-4" />
            <p>{{ post.fields.content }}</p>
        </div>
        <v-alert v-else type="error">Post not found.</v-alert>
    </v-container>
</template>
