<script>
export default {
    name: 'youtube',
    data: function () {
        return {
            latestvideo: [],
        }
    },
    methods: {
        fetchChannel() {
            const limes = ["Omnimorris ",
                "64lava",
                "CampSlapaa ",
                "ChronicallyCrfty ",
                "GenuineChili",
                "GoofeeGoobed",
                "KrystalDad",
                "Levidmorris",
                "micropig5",
                "MomoiroMilo",
                "TheMrGoob",
                "Sicksid3534",
                "SilverSlushie",
                "Tworata",
                "VolitideYT ",
                "Wilvis0514"]
            const api_key = import.meta.env.VITE_YOUTUBE_API;
            limes.forEach((forHandle) => {
                const youtubechannelurl = new URL("https://www.googleapis.com/youtube/v3/channels?")

                youtubechannelurl.searchParams.set("key", api_key)
                youtubechannelurl.searchParams.set("part", "contentDetails")
                youtubechannelurl.searchParams.set("forHandle", forHandle)

                fetch(youtubechannelurl, {
                    method: 'get',

                }).then(function (response) {
                    return response.json();
                }).then(data => {

                    const items = data.items

                    for (const [key, value] of Object.entries(items)) {
                        // Extract the videoId from the snippet

                        for (const [k, v] of Object.entries(value.contentDetails)) {

                            let channelId = v.uploads.toString()
                            const youtubechannelsearch = new URL('https://www.googleapis.com/youtube/v3/playlistItems?')
                            youtubechannelsearch.searchParams.set("key", api_key)
                            youtubechannelsearch.searchParams.set("part", "snippet")
                            youtubechannelsearch.searchParams.set("playlistId",  channelId )
                            youtubechannelsearch.searchParams.set("maxResults",1)

                            fetch(youtubechannelsearch, {
                                method: 'get',

                            }).then(function (response) {
                                return response.json();
                            }).then(data => {
                                for(const [key, value] of Object.entries(data.items)) {
                                    const videoId = value.snippet.resourceId.videoId
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
                                    thumbnails: value.snippet.thumbnails,
                                    // TODO: We don't have duration information yet.
                                    duration: "NA",
                                })
                            }
                            })
                        }
                    };
                })
            })
        },
        load ({ done }) {
        setTimeout(() => {
          done('empty')
        }, 1000)
      },

    },
    mounted() {
        this.fetchChannel()

    }
}
</script>
<template> 
  <v-infinite-scroll
    height="500"
    @load="load"
  >
    <template v-for="(item, index) in latestvideo" :key="item" :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        <embed :src="item.videoEmbedUrl">
    </template>
    <template v-slot:empty>
      <v-alert border="start"
      border-color="green-darken-1"
      elevation="2">Check specific lime channels for more!</v-alert>
    </template>
  </v-infinite-scroll>
<!-- <embed :src="item.videoEmbedUrl"> -->
</template>
