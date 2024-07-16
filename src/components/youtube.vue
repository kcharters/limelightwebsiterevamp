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

            const api_key = import.meta.env.VITE_YOUTUBE_API;

            const youtubechannelurl = new URL("https://www.googleapis.com/youtube/v3/playlistItems")

            youtubechannelurl.searchParams.set("key", api_key)

            youtubechannelurl.searchParams.set("part", "snippet")
            youtubechannelurl.searchParams.set("playlistId", "PLLPqZJRXAEj6kEVhrE7gcSZip9a_5usQ4")
            youtubechannelurl.searchParams.set("maxResults", 5)

            fetch(youtubechannelurl, {
                method: 'get',

            }).then(function (response) {
                return response.json();
            }).then(data => {
                const items = data.items

                for(const [key, value] of Object.entries(items)){
                    // Extract the videoId from the snippet
                    let videoId = value.snippet.resourceId.videoId
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
            };
            })

        },

    },
    mounted() {
         this.fetchChannel()

    }
}
</script>
<template>
    <div v-for="video in latestvideo">
        <embed :src="video.videoEmbedUrl"/>
    </div>
</template>
