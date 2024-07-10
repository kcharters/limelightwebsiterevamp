<script>
export default {
    name: 'twitch',
    data: function () {
        return {
            whoislive: [],
        }
    },
    methods: {
        fetchToken: function () {
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

            const client_id = import.meta.env.VITE_CLIENT_ID;
            const access_token = import.meta.env.VITE_ACCESS_TOKEN;

            for (let i = 0; i < limes.length; i++) {
                let url = "https://api.twitch.tv/helix/streams?user_login=" + limes[i].toLowerCase();

                fetch(url, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + access_token,
                        'Client-ID': client_id
                    }),
                }).then(function (response) {
                    return response.json();
                }).then(data => {

                    let whoislive = []

                    for(var key in data.data){
                        whoislive.push({
                            streamtype: data.data[key].type,
                            streamname: data.data[key].user_name
                        })
                        this.whoislive = whoislive
                    }

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
<div v-for="users in whoislive">
    <p>{{ users.streamname }}</p>
</div>
</template>
