<script>
import { VueFlip } from 'vue-flip';

export default {
  components: {
    'vue-flip': VueFlip
  },
  data: function () {
    return {
      limes: [{ name: "0mnimorris", youtube: "Omnimorris", twitch: "omnimorris" },
      { name: "64Lava", youtube: "64lava", },
      { name: "BiklePlays", youtube: "BiklePlays" },
      { name: "BurningSkul1", youtube: "BurningSkul1" },
      { name: "CampSlapaa", youtube: "CampSlapaa ", twitch: "campslapaa" },
      { name: "ChronicallyCrafty", youtube: "ChronicallyCrfty ", twitch: "chronicallycrafty" },
      { name: "Fireheart20198", twitch: "Fireheart20198" },
      { name: "Goofeegoobed", youtube: "GoofeeGoobed", twitch: "GoofeeGoobed" },
      { name: "GenuineChili", youtube: "GenuineChili", },
      { name: "IcedTeaza", youtube: "IcedTeaza ", twitch: "IcedTeaza" },
      { name: "Indie_Outlaw", twitch: "Indie_Outlaw" },
      { name: "Koska", youtube: "koskaLCMER", },
      { name: "KrystalDad", youtube: "KrystalDad ", twitch: "KrystalDad" },
      { name: "Levidmorris", youtube: "Levidmorris", twitch: "Levidmorris" },
      { name: "LordAndrilton", twitch: "lordandrilton" },
      { name: "Micropig", youtube: "micropig5", twitch: "micro_piglet", tiktok: "micropig5" },
      { name: "Mistfit", twitch: "Mistfit__ " },
      { name: "Momoiromilo", youtube: "MomoiroMilo", twitch: "MomoiroMilo", tiktok: "MomoiroMilo" },
      { name: "Mr_Goob_", youtube: "TheMrGoob", },
      { name: "RellacTheSpaceNerd", twitch: "rellacthespacenerd" },
      { name: "SickSid", youtube: "Sicksid3534", },
      { name: "SilverSlushie", youtube: "SilverSlushie", twitch: "SilverSlushie " },
      { name: "Tirata", youtube: "Tworata", twitch: "Ttiratta" },
      { name: "Volitide", youtube: "VolitideYT", twitch: "Volitide" },
      { name: "Wilvis0514", youtube: "Wilvis0514 ", twitch: "Wilvis0514" }]
    }
  },
  methods: {
    getImgUrl(limes) {
      const getImgUrl = new URL('../../src/assets/images/' + limes + '.png', import.meta.url).href
      return getImgUrl
    }
  },
  mounted() {

  }
}
</script>
<template>
  <v-row dense>

    <v-card v-for="(lime, index) of limes" :key="index" elevation="16" width="416px" height="583px" class="d-flex flex-column">
      <v-card-title>{{ lime.name }}</v-card-title>
      <v-card-text class="card-img-top" hover>
        <vue-flip :active-click="true" >
          <template v-slot:front class="front" >

            <img :src="'\\limeskins\\' + lime.name + '.png'" width="300px" height="400px" />

          </template>
          <template v-slot:back class="back" hover>
            <img src="@\assets\images\Stats.png" width="360px" height="505px" />
          </template>
        </vue-flip>
      </v-card-text>
      <v-card-actions>
        <div v-if="lime.youtube">
          <v-btn icon="fa-youtube" :href="'https://www.youtube.com/@' + lime.youtube" target="_blank">
          </v-btn>
        </div>
        <div v-if="lime.twitch">
          <v-btn icon="fa-twitch" :href="'https://www.twitch.tv/' + lime.twitch" target="_blank">
          </v-btn>
        </div>
        </v-card-actions>
    </v-card>

  </v-row>
</template>
