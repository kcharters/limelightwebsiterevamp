<script setup>
import { computed, unref } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()
const isMobile = computed(() => {
  return unref(display.smAndDown)
})

const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>
<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <img src="@\assets\ll_logo.png" width="100" height="100" />
    </template>

    <v-app-bar-title>LimeLight SMP</v-app-bar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn>Limes</v-btn>
      <v-btn>Links</v-btn>
    </v-toolbar-items>

    <!-- Add a navigation bar -->
    <v-menu v-if="isMobile">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon color="primary" v-bind="props">
        </v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Navigation bar ends -->
  </v-app-bar>

</template>

<style >

</style>
