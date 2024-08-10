<script setup>
import { computed, unref } from "vue";
import { useDisplay } from "vuetify";

const display = useDisplay();
const isMobile = computed(() => {
  return unref(display.smAndDown);
});

const items = [{ title: "Limes" }];
</script>
<template>
  <v-app-bar :elevation="24">
    <template v-slot:prepend>
      <router-link :to="{ name: 'home' }"
        ><img src="@\assets\images\ll_logo.png" width="75wh" height="75vh"
      /></router-link>
    </template>
    
    <v-app-bar-title
      ><router-link :to="{ name: 'home' }"
      >Limelight SMP</router-link>
      <div v-if="!isMobile" class="v-btn">
        <v-btn variant="tonal" v-for="(item, index) in items" :key="index" :value="index">
          <router-link :to="{ name: item.title.toLowerCase() }"> Limes </router-link>
        </v-btn>
      </div>
    </v-app-bar-title>
    <!-- Add a navigation bar -->
    <v-menu v-if="isMobile">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon v-bind="props"> </v-app-bar-nav-icon>
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

<style>
.v-btn__content {
  color: #fdfed3 !important;
}
.v-btn {
  margin-left: 10px;
}
</style>
