<script>
export default {
    name: 'youtube',
    data: function () {
        return {
            channelid: "",
        }
    },
    methods: {
        fetchChannel: function () {

            const api_key = import.meta.env.VITE_YOUTUBE_API;

            const youtubeapiurl = new URL("https://www.googleapis.com/youtube/v3/channels")
            youtubeapiurl.searchParams.set("part", "snippet")
            youtubeapiurl.searchParams.set("forHandle", "limelightsmp")
            youtubeapiurl.searchParams.set("key", api_key)

            fetch(youtubeapiurl, {
                    method: 'get',

                }).then(function (response) {
                    return response.json();
                }).then(data => {
                    for (const x of data.items)
                    {
                        return this.channelid = x.id
                    }

                }).then(function(data){
                    console.log(data)
                    const sectionsurl = new URL("https://www.googleapis.com/youtube/v3/channelSections")
                    sectionsurl.searchParams.set("part", "snippet")
                    sectionsurl.searchParams.set("key", api_key)
                    sectionsurl.searchParams.set("channelId",data)

                    fetch(sectionsurl,{
                        method: 'get',
                    }).then(function (response) {
                    return response.json();
                }).then(data=>{
                    console.log(data)
                })
                })

        },
        fetchSection: function(){

        }

    },
    mounted() {
        this.fetchChannel()
        this.fetchSection()
    }
}
</script>
<template>
    <div>
        <!---- <embed src="videos.videoEmbedUrl"></embed> -->
    </div>
</template>
