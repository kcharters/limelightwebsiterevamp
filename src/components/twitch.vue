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

                    for (var key in data.data) {
                        whoislive.push({
                            streamtype: data.data[key].type,
                            streamname: data.data[key].user_name,
                            streamtitle: data.data[key].title,
                            gamename: data.data[key].game_name,
                            thumbnail: data.data[key].thumbnail_url
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
    <v-container>
        Live now on twitch! :
        <v-row dense>
            <v-col cols="12">
                <div v-for=" users in whoislive">
                    <v-card variant="tonal" hover>
                        <v-card-title>{{ users.streamname }}</v-card-title>
                        <v-card-subtitle>{{ users.gamename }}</v-card-subtitle>
                        <v-card-text>{{ users.streamtitle }}</v-card-text>
                        <v-card-actions>
                            <a :href="'https://www.twitch.tv/' + users.streamname"
                                target="_blank"><v-btn>{{ users.streamname }}</v-btn></a>
                        </v-card-actions>

                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
