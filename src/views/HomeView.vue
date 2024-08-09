<script setup>

import Twitch from "../components/twitch.vue";
import Youtube from "../components/youtube.vue"

</script>
<template >
  <v-container class="smaller">
    <v-row>
      <v-col cols="12" md="6" style="margin: 0 auto;">
        Live now on twitch! :
        <Twitch />
      </v-col>
      <v-col cols="12" md="6" style="margin: 0 auto;">
        Latest Youtube Uploads! :
        <Youtube />
      </v-col>
    </v-row>
    
  </v-container>
</template>
<style >
.smaller{
  
    max-width: 100vw !important;
    max-height: 50vw !important;

}
</style>
