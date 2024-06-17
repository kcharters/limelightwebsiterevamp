<script>


export default {
    drawer: false,
    tab: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news',
      ],
}

</script>
<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <img src="@/assets/Lime-with-rays.png" width="50" height="50"/>
        </template>

        <v-app-bar-title>LimeLight SMP</v-app-bar-title>

    <!-- Add a navigation bar -->
    <template v-slot:append>
      <v-app-bar-nav-icon @click="drawer = true"
                           class="d-flex d-sm-none"
                           ></v-app-bar-nav-icon>
                          </template>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
        >
          <v-list-item v-for="(item, index) in items">
            <v-list-item-title @click="tab = index">{{ item }}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Navigation bar ends -->
</v-app-bar>

</template>

<style scoped>

</style>
