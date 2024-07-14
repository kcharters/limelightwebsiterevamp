<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from "./components/nav.vue";
</script>

<template>
    <v-app>
        <Nav />
        <RouterView />
    </v-app>
</template>

<style>

</style>
