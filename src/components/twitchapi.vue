<script setup>
import { onMounted } from "vue";
import axios from "redaxios";

const channelList = [
  "omnimorris",
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
  "Wilvis0514",
];

const channels = {};
const selectedChannel = null;
const channelToAdd = "";

const params = new URLSearchParams();

params.append("clientID", import.meta.env.VITE_CLIENT_ID);
params.append("clientSecret", import.meta.env.VITE_CLIENT_SECRET);
params.append("grantType", import.meta.env.VITE_GRANT_TYPE);

const url = "http://id.twitch.tv/oauth2";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

async function fetchTwitchAuth() {
  console.log("pretest");
  const response = await axios.post(url, params, config);
  console.log(response.data);
  console.log("test");
}

onMounted(async () => {
  fetchTwitchAuth();
});
</script>

<template></template>

<style></style>
