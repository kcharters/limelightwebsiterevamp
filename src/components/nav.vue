<script setup>
import { computed, unref } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()
const isMobile = computed(() => {
  return unref(display.smAndDown)
})

const items = [
  { title: 'Limes' },
]
</script>
<template>
  <v-app-bar :elevation="24" :density="compact" class="pr-10">
    <template v-slot:prepend>
      <router-link :to="{ name: 'home' }"><img src="@\assets\ll_logo.png" width="75" height="75vh" /></router-link>
    </template>
    <v-app-bar-title>LimeLight SMP</v-app-bar-title>

    <v-toolbar-items class="hidden-sm-and-down" v-for="(item, index) in items" :key="index" :value="index">
      <router-link :to="{ name: item.title.toLowerCase() }" class="v-btn">
        Limes
        </router-link>

    </v-toolbar-items>

    <!-- Add a navigation bar -->
    <v-menu v-if="isMobile">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon color="primary" v-bind="props">
        </v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <router-link :to="{ name: item.title.toLowerCase() }">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </router-link>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Navigation bar ends -->
  </v-app-bar>

</template>

<style></style>
