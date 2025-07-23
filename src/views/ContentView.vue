<script setup>

import Twitch from "../components/twitch.vue";
import Youtube from "../components/youtube.vue";
</script>
<template>
        <v-container>
                <v-row class="smaller pt-5">
                        <v-col>
                                <p class="text-body1">Live now on twitch! :</p>
                                <Twitch />
                        </v-col>
                        <v-col>
                                Latest Youtube Uploads! :
                                <Youtube />
                        </v-col>
                </v-row>
        </v-container>
</template>
