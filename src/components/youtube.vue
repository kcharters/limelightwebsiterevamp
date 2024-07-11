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
            const limes = ["Omnimorris",
                "64lava",
                "Aenay",
                "CampSlapaa",
                "GenuineChili",
                "GoofeeGoobed",
                "KrystalDad",
                "IcedTeaza",
                "koskaLCMER",
                "Levidmorris",
                "micropig5",
                "MomoiroMilo",
                "TheMrGoob",
                "Nightowlmc",
                "RayTG_",
                "SilverSlushie",
                "Sicksid3534",
                "Tworata",
                "VolitideYT",
                "Wilvis0514"
            ]

            const youtubechannelurl = new URL("https://www.googleapis.com/youtube/v3/channels")

            youtubechannelurl.searchParams.set("key", api_key)
            limes.forEach((lime)=>{
                youtubechannelurl.searchParams.set("part", "contentDetails")
                youtubechannelurl.searchParams.set("forHandle", lime)
                fetch(youtubechannelurl, {
                    method: 'get',

                }).then(function (response) {
                    return response.json();
                }).then(data => {
                    console.log(data)
                })
            })
            //end of for statement

        },
        fetchSection: function () {

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
