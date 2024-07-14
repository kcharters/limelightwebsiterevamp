<script>
export default {
    name: 'youtube',
    data: function () {
        return {
            videos: null,
        }
    },
    methods: {
        fetchChannel(){

            const api_key = import.meta.env.VITE_YOUTUBE_API;

            const youtubechannelurl = new URL("https://www.googleapis.com/youtube/v3/playlistItems")

            youtubechannelurl.searchParams.set("key", api_key)

            youtubechannelurl.searchParams.set("part", "snippet")
            youtubechannelurl.searchParams.set("playlistId", "PLLPqZJRXAEj6kEVhrE7gcSZip9a_5usQ4")
            fetch(youtubechannelurl, {
                method: 'get',

            }).then(function (response) {
                return response.json();
            }).then(data => {
                const items = data.items
                return items.map((item)=>{

                    const videoId = item.snippet.resourceId.videoId
                    this.videos = "https://www.youtube.com/embed/".concat(videoId)
                })

            })

        },

    },
    mounted() {
        this.fetchChannel()
    }
}
</script>
<template>
    <div>
        <embed :src="videos"></embed>
    </div>
</template>
