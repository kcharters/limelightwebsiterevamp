<script>
export default {
  name: "youtube",
  data: function () {
    return {
      latestvideo: [],
    };
  },
  methods: {
    fetchChannel() {
      const limes = [
        "Omnimorris ",
        "64lava",
        "BiklePlays",
        "CampSlapaa ",
        "ChronicallyCrfty ",
        "colourtongue",
        "Dekoba",
        "GenuineChili",
        "GoofeeGoobed",
        "KrystalDad",
        "JollyOldMaeYT",
        "Levidmorris",
        "MomoiroMilo",
        "TheMrGoob",
        "YourPalPal",
        "Sicksid3534",
        "TirataMC",
        "VolitideYT ",
        "Wilvis0514",
        "SilverSlushie",
      ];

      const api_key = import.meta.env.VITE_YOUTUBE_API;

      const youtubechannelsearch = new URL(
        "https://www.googleapis.com/youtube/v3/playlistItems?"
      );
      youtubechannelsearch.searchParams.set("key", api_key);
      youtubechannelsearch.searchParams.set("part", "snippet");
      youtubechannelsearch.searchParams.set(
        "playlistId",
        "PLLPqZJRXAEj54NmXieetWPIB9_2lJp2Ew"
      );
      youtubechannelsearch.searchParams.set("maxResults", 50);

      fetch(youtubechannelsearch, {
        method: "get",
      })
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          for (const [key, value] of Object.entries(data.items)) {
            const videoId = value.snippet.resourceId.videoId;
            const largeThumbnail = value.snippet.thumbnails.standard.url;
            this.latestvideo.push({
              id: value.id,
              position: value.snippet.position,
              videoId: videoId,
              title: value.title,
              publishedAt: value.snippet.publishedAt,
              title: value.snippet.title,
              description: value.snippet.description,
              // Concatenate the video ID with the base URL to get the full video URL
              videoUrl: "https://youtu.be/".concat(videoId),
              videoEmbedUrl: "https://www.youtube.com/embed/".concat(videoId),
              thumbnails: largeThumbnail,
              // TODO: We don't have duration information yet.
              duration: "NA",
            });
          }
        });
    },
    load({ done }) {
      setTimeout(() => {
        done("empty");
      }, 1000);
    },
  },
  mounted() {
    this.fetchChannel();
  },
};
</script>
<template>
  <v-infinite-scroll height="500" width="350" @load="load">
    <template v-for="(item, index) in latestvideo.slice().reverse()" :key="item">
      <embed :src="item.videoEmbedUrl" width="325" />
    </template>
    <template v-slot:empty>
      <v-alert border="start" border-color="green-darken-1" elevation="2"
        >Check specific lime channels for more!</v-alert
      >
    </template>
  </v-infinite-scroll>
  <!-- <embed :src="item.videoEmbedUrl"> -->
</template>
<style css scoped></style>
