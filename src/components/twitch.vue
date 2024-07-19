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
                "chronicallycrafty",
                "Fireheart20198",
                "genuinechili",
                "GoofeeGoobed",
                "IcedTeaza",
                "Indie_Outlaw",
                "KrystalDad",
                "Levidmorris",
                "lordandrilton",
                "micro_piglet",
                "Mistfit__",
                "MomoiroMilo",
                "rellacthespacenerd",
                "SilverSlushie",
                "Ttiratta",
                "Volitide",
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
                    if (data.data.length == 0) {
                        this.whoislive.push()
                    }
                    else{
                        for (var key in data.data) {

                            whoislive.push({
                                streamtype: data.data[key].type,
                                streamname: data.data[key].user_name,
                                streamtitle: data.data[key].title,
                                gamename: data.data[key].game_name,
                                thumbnail: data.data[key].thumbnail_url
                            })
                            whoislive.forEach(user => {

                                this.whoislive.push({
                                    streamtype: user.streamtype,
                                    streamname: user.streamname,
                                    streamtitle: user.streamtitle,
                                    gamename: user.gamename,
                                    thumbnail: user.thumbnail
                                })

                                return this.whoislive
                            })

                        }
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

        <v-row dense>
            <v-card v-if="whoislive.length == 0"><v-card-title>Oh no 😢</v-card-title><v-card-text>Their are no limes streaming at the moment</v-card-text></v-card>
            <div v-for="(users, index) in whoislive" :key="index" v-else>
                <v-col cols="12">
                    <v-card variant="tonal" hover >
                        <v-card-title>{{ users.streamname }}</v-card-title>
                        <v-card-subtitle>{{ users.gamename }}</v-card-subtitle>
                        <v-card-text>{{ users.streamtitle }}</v-card-text>
                        <v-card-actions>
                            <a :href="'https://www.twitch.tv/' + users.streamname" target="_blank"><v-btn>{{
                                    users.streamname }}</v-btn></a>
                        </v-card-actions>

                    </v-card>

                </v-col>
            </div>
        </v-row>
    </v-container>
</template>
