<script>
import { VueFlip } from 'vue-flip';
export default {
  components: {
    'vue-flip': VueFlip
  }
}
</script>
<template>
<vue-flip height="100px" width="100px">
    <v-card v-slot:front>
    front
    </v-card>
  <v-card v-slot:back>
    back
  </v-card>
</vue-flip>
</template>
