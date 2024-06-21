<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

async function fetchTwitchData() {
        const catFactsResponse = await axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5')
        catFacts.value = catFactsResponse.data
    }


onMounted(async () => {
        await fetchTwitchData()
    })
</script>

<template>


</template>

<style>
</style>
