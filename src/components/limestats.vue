<script>
import { VueFlip } from "vue-flip";

export default {
  components: {
    "vue-flip": VueFlip,
  },
  data: function () {
    return {
      limes: [
        { name: "0mnimorris", youtube: "Omnimorris", twitch: "omnimorris" },
        { name: "64Lava", youtube: "64lava" },
        { name: "BiklePlays", youtube: "BiklePlays" },
        { name: "ChronicallyCrafty", youtube: "ChronicallyCrfty ", twitch: "chronicallycrafty" },
        { name: "Colour", youtube: "colourtongue", twitch: "colourtongue" },
        { name: "Dekoba", youtube: "Dekoba" },
        { name: "Fireheart20198", twitch: "Fireheart20198" },
        { name: "GenuineChili", youtube: "GenuineChili" },
        { name: "Goofeegoobed", youtube: "GoofeeGoobed", twitch: "GoofeeGoobed" },
        { name: "Indie_Outlaw", twitch: "Indie_Outlaw" },
        { name: "KrystalDad", youtube: "KrystalDad ", twitch: "KrystalDad" },
        { name: "Levidmorris", youtube: "Levidmorris", twitch: "Levidmorris" },
        { name: "MommaJolly", youtube: "JollyOldMaeYT", twitch: "jollyoldmae" },
        { name: "Momoiromilo", youtube: "MomoiroMilo", tiktok: "MomoiroMilo", },
        { name: "Mr_Goob_", youtube: "TheMrGoob" },
        { name: "Pal", youtube: "YourPalPal", twitch: "yourpalpal" },
        { name: "Ray", youtube: "RayTG_", twitch: "raytg_" },
        { name: "SickSid", youtube: "Sicksid3534" },
        { name: "ThatSlaps", youtube: "campslapaa", twitch: "thatslapsmc" },
        { name: "Tirata", youtube: "TirataMC", twitch: "Ttiratta" },
        { name: "Volitide", youtube: "VolitideYT", twitch: "Volitide" },
        { name: "Wilvis0514", youtube: "Wilvis0514 ", twitch: "Wilvis0514" },
      ],
    };
  },
  methods: {},
  mounted() { },
};
</script>
<template>
  <v-row dense>
    <v-card v-for="(lime, index) of limes" :key="index + lime.name" elevation="16" width="416px" height="583px"
      class="d-flex flex-column">
      <v-card-title>{{ lime.name }}</v-card-title>
      <v-card-text class="card-img-top">
        <vue-flip :active-click="true">
          <template v-slot:front class="front">
            <img :src="'\\cards\\' + lime.name + '.png'" width="360px" height="475px" />
          </template>
          <template v-slot:back class="back">
            <img :src="'\\limeskins\\' + lime.name + '.png'" width="300px" height="400px" />
          </template>
        </vue-flip>
      </v-card-text>
      <v-card-actions>
        <div v-if="lime.youtube">
          <v-btn variant="tonal" prepend-icon="fa-youtube" :href="'https://www.youtube.com/@' + lime.youtube"
            target="_blank">
            Youtube
          </v-btn>
        </div>
        <div v-if="lime.twitch">
          <v-btn variant="tonal" prepend-icon="fa-twitch" :href="'https://www.twitch.tv/' + lime.twitch"
            target="_blank">
            Twitch
          </v-btn>
        </div>
        <div v-if="lime.tiktok">
          <v-btn prepend-icon="fa-twitch" variant="tonal" :href="'https://tiktok.com/' + lime.tiktok" target="_blank">
            TikTok
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-row>
</template>
<style>
.front {
  cursor: pointer;
}
</style>
