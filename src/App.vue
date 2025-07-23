<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from "./components/nav.vue";


</script>

<template>
    <v-app>
        <v-container>
            <Nav />
        </v-container>
        <v-container fluid="false" class="mt-8">
            <RouterView />
        </v-container>
    </v-app>
</template>
