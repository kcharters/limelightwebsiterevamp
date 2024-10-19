<script setup>
import Twitch from "../components/twitch.vue";
import Youtube from "../components/youtube.vue";
</script>
<template>
    <v-row  class="smaller pt-5">
      <v-col cols="12" md="6" style="margin: 0 auto">
        Live now on twitch! :
        <Twitch />
      </v-col>
      <v-col cols="6" md="4">
        Latest Youtube Uploads! :
        <Youtube />
      </v-col>
    </v-row>
</template>
<style>

.smaller {
  
  max-width: 100vw !important;
  max-height: 50vw !important;
}
</style>
