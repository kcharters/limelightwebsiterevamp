<template>
  <v-app-bar flat class="px-4">
    <!-- Logo -->
    <v-btn elevation="0" class="no-active-btn mr-2" to="/">
      <img src="@/assets/images/ll_logo.png" alt="Logo" style="width: 40px; height: 40px;" />
    </v-btn>
    <span class="font-bold text-h6">Limelight SMP</span>

    <v-spacer />

    <!-- Desktop Navigation -->
    <v-row v-show="!$vuetify.display.smAndDown" align="center" dense>
      <template v-for="link in links" :key="link.text">
        <v-btn v-if="link.to" text :to="link.to">
          {{ link.text }}
        </v-btn>
        <v-btn v-else-if="link.href" text :href="link.href" target="_blank" rel="noopener">
          {{ link.text }}
        </v-btn>
      </template>
    </v-row>

    <!-- Right Side Icons -->
    <ThemeToggle />
    <v-btn variant="text" class="ml-2 md:hidden" @click="drawer = !drawer">
      <v-icon>{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Navigation Drawer (Mobile) -->
  <v-navigation-drawer v-model="drawer" temporary app v-show="$vuetify.display.smAndDown">
    <v-list>
      <template v-for="link in links" :key="link.text">
        <v-list-item v-if="link.to" :to="link.to" @click="drawer = false" link>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-else-if="link.href" :href="link.href" target="_blank" rel="noopener" @click="drawer = false"
          link>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.no-active-btn>.v-btn__overlay {
  background-color: transparent !important;
  box-shadow: none !important;
  display: none;
}
</style>

<script setup>
import { ref } from 'vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { text } from '@fortawesome/fontawesome-svg-core';
function isExternal(url) {
  return /^https?:\/\//.test(url);
}
const drawer = ref(false);

const links = [
  { text: 'Home', to: '/' },
  { text: 'Content', to: '/content' },
  { text: 'Blog', to: '/blog' },
  { text: 'S4 Playlist', href: 'https://www.youtube.com/playlist?list=PLLPqZJRXAEj4Pxb8HudOngnwpyekaxG61&jct=FDp0dZgWD4YdkRN1WmxW7Q' },
  { text: 'Community Discord', href: 'https://discord.gg/kjXNbhef5N' }
];
</script>
