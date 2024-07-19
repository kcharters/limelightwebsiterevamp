<script setup>

import Twitch from "../components/twitch.vue";
import Youtube from "../components/youtube.vue"

</script>
<template>
  <v-container>
    
      <v-col  class="d-md-inline-flex" >
        Live now on twitch! :
        <Twitch />
      </v-col>
      <v-col  class="d-md-inline-flex">
        Latest Youtube Uploads! :
        <Youtube />
      </v-col>

    
  </v-container>
</template>
