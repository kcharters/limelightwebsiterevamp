<script setup>
import { computed, unref } from "vue";
import { useDisplay } from "vuetify";

const display = useDisplay();
const isMobile = computed(() => {
  return unref(display.smAndDown);
});
</script>
<template>
  <v-app-bar :elevation="24">
    <template v-slot:prepend>
      <router-link :to="{ name: 'home' }"><img src="@\assets\images\ll_logo.png" width="75wh"
          height="75vh" /></router-link>
    </template>

    <v-app-bar-title><router-link :to="{ name: 'home' }">Limelight SMP</router-link>
      <div v-if="!isMobile" class="v-btn">
        <v-btn variant="tonal">
          <router-link :to="{ name: 'content' }"> content </router-link>
        </v-btn>
        <v-btn variant="tonal">
          <a href="https://discord.gg/kjXNbhef5N" target="_blank"> Join the Community Discord </a>
        </v-btn>
        <v-btn variant="tonal">
          <a href="https://www.youtube.com/playlist?list=PLLPqZJRXAEj54NmXieetWPIB9_2lJp2Ew" target="_blank">
            S4 Playlist
          </a>
        </v-btn>
      </div>
    </v-app-bar-title>
    <!-- Add a navigation bar -->
    <v-menu v-if="isMobile">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon v-bind="props"> </v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item>
          <router-link :to="{ name: 'content' }"> content </router-link>
        </v-list-item>
        <v-list-item>
          <a href="https://www.youtube.com/playlist?list=PLLPqZJRXAEj54NmXieetWPIB9_2lJp2Ew" target="_blank">
            S4 Playlist
          </a>
        </v-list-item>
        <v-list-item>
          <a href="https://discord.gg/kjXNbhef5N" target="_blank"> Discord </a>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style>
.v-btn__content {
  color: #fdfed3 !important;
}

.v-btn {
  margin-left: 10px;
}
</style>
