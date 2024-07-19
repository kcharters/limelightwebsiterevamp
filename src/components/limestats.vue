<script>
import { VueFlip } from 'vue-flip';

export default {
  components: {
    'vue-flip': VueFlip
  },
  data: function(){
    return {
      limes :["0mnimorris",
                "64Lava",
                "CampSlapaa",
                "ChronicallyCrafty",
                "Fireheart20198",
                "Goofeegoobed",
                "GenuineChili",
                "IcedTeaza",
                "Indie_Outlaw",
                "Koska",
                "KrystalDad",
                "Levidmorris",
                "LordAndrilton",
                "Micropig",
                "Mistfit",
                "Momoiromilo",
                "Mr_Goob_",
                "RellacTheSpaceNerd",
                "SickSid",
                "SilverSlushie",
                "Tirata",
                "Volitide",
                "Wilvis0514"]
    }
  },
  methods:{
    getImgUrl(limes){
    const getImgUrl = new URL('../../src/assets/images/'+limes+'.png', import.meta.url).href
    return getImgUrl
  }
  },
  mounted(){

  }
}
</script>
<template>
<v-row dense>

  <v-card v-for="(lime, index) of limes" :key="index" width="200px" height="200px">
    <vue-flip :active-click="true" width="200px" height="200px">
          <template v-slot:front class="front">
            <v-card-title>{{lime}}</v-card-title>
            <v-card-text><img :src="'\\limeskins\\'+lime+'.png'" width="100px" height="125px"/></v-card-text>
            <v-card-actions>click to see stats</v-card-actions>
          </template>
          <template v-slot:back class="back">
            <img src="@\assets\images\Stats.png" width="200px" height="200px"/>
          </template>
        </vue-flip>
      </v-card>

  </v-row>
</template>
