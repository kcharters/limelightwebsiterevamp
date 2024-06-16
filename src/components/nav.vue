<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeart } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiHeart,
    }
  }
}

</script>
<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
      
        <v-app-bar-title>Application Bar</v-app-bar-title>
      
        <template v-slot:append>
          <v-btn icon="mdi-heart"></v-btn>
      
          <v-btn icon="mdi-magnify"></v-btn>
      
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

</template>

<style scoped>

</style>