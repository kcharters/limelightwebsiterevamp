<template>
  <v-app-bar app color="bgColor" elevate-on-scroll class="px-4">
    <!-- Logo + Title -->
    <template v-slot:prepend>
      <router-link to="/" class="flex items-center gap-2 text-decoration-none" aria-label="Limelight SMP">
        <v-img :src="logo" alt="Limelight SMP Logo" width="40" height="40" />
        <span class="hidden sm:inline-block text-2xl font-bold text-accent-one">
          Limelight SMP
        </span>
      </router-link>
    </template>


    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-4">
      <router-link v-for="link in menuLinks" :key="link.path" :to="link.path"
        class="text-sm font-medium hover:underline underline-offset-2"
        :aria-current="$route.path === link.path ? 'page' : false">
        {{ link.title }}
      </router-link>

      <router-link to="/posts/citrus-docs/intro/"
        class="flex h-8 items-center rounded-lg bg-accent-base/5 px-4 text-accent-base text-sm font-medium hover:bg-accent-base/10">
        Docs
      </router-link>

      <ThemeToggle />
    </div>

    <!-- Mobile Menu Toggle Button -->
    <v-btn icon class="md:hidden" @click="drawerOpen = !drawerOpen">
      <v-icon>{{ drawerOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer v-model="drawerOpen" temporary right class="bg-bgColor">
    <v-list class="text-center">
      <v-list-item v-for="link in menuLinks" :key="link.path" :to="link.path" link @click="drawerOpen = false">
        <v-list-item-title class="text-lg font-medium">
          {{ link.title }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/posts/citrus-docs/intro/" link @click="drawerOpen = false">
        <v-list-item-title class="text-lg font-medium">
          Docs
        </v-list-item-title>
      </v-list-item>

      <div class="mt-4">
        <ThemeToggle />
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import ThemeToggle from './ThemeToggle.vue';
import logo from '@/assets/images/ll_logo.png';

const drawerOpen = ref(false);

const menuLinks = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/blog', title: 'Blog' },
  { path: '/notes', title: 'Notes' },
];
</script>
