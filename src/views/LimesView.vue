<script setup>
import Limes from "../components/limestats.vue";
const limes = ["omnimorris",
                "campslapaa",
                "Fireheart20198",
                "GoofeeGoobed",
                "IcedTeaza",
                "Indie_Outlaw",
                "KrystalDad",
                "Levidmorris",
                "lordandrilton",
                "micro_piglet",
                "Mistfit__",
                "MomoiroMilo",
                "nightowl35",
                "RayTG_",
                "rellacthespacenerd",
                "SilverSlushie",
                "Wilvis0514"]
</script>
<template>
    <div v-for="lime in limes">
        <Limes/>
    </div>

</template>
