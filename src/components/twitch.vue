<script>
export default {
    name: 'twitch',
    data: function () {
        return {
            whoIsLive: ["omnimorris",
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
                "Wilvis0514"],
        }
    },
    methods: {
        fetchToken: function () {
            const whoIsLive = ["omnimorris",
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

            const client_id = import.meta.env.CLIENT_ID;
            const access_token = import.meta.env.ACCESS_TOKEN;

            for (let i = 0; i < whoIsLive.length; i++) {
                let url = "https://api.twitch.tv/helix/streams" + whoIsLive[i] + "?callback=?";


                fetch(url, {
                    method: 'post',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + access_token,
                        'Client-ID': client_id
                    }),
                }).then(function (response) {
                    return response.json();
                }).then(data => {
                    console.log(data)
                })
            }
        }

    },
    mounted() {
        this.fetchToken()
    }
}
</script>
<template>

</template>
