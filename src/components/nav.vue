<template>
  <v-app-bar flat color="background" class="px-4">
    <!-- Logo -->
    <v-btn icon to="/" class="mr-2">
      <img src="@/assets/images/ll_logo.png" alt="Logo" style="width: 40px; height: 40px;" />
    </v-btn>
    <span class="font-bold text-h6">Limelight SMP</span>

    <v-spacer />

    <!-- Desktop Navigation -->
    <v-row class="hidden md:flex" align="center" dense>
      <v-btn text v-for="link in links" :key="link.text" :to="link.to">
        {{ link.text }}
      </v-btn>
    </v-row>

    <!-- Right Side Icons -->
    <ThemeToggle />
    <v-btn icon class="ml-2 md:hidden" @click="drawer = !drawer">
      <v-icon>{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item v-for="link in links" :key="link.text" :to="link.to" link>
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

const drawer = ref(false);

const links = [
  { text: 'Home', to: '/' },
  { text: 'Content', to: '/content' },
  { text: 'Blog', to: '/blog' },
  { text: 'S4 Playlist', to: '/playlist' },
  { text: 'Docs', to: '/docs' },
];
</script>
