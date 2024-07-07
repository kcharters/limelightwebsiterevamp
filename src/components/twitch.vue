<script>
export default {
    name: 'twitch',
    data: function () {
        return {
            whoIsLive: [],
        }
    },
    methods: {
        fetchToken: function () {
            const client_id = import.meta.env.CLIENT_ID;
            const client_secret = import.meta.env.CLIENT_SECRET;
            let url = "https://api.allorigins.win/get?url="+"https://id.twitch.tv/oauth2/token"
            fetch(url, {
                method: 'post',
                headers: new Headers({
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Content-Type': 'application/json',
                }),
            }).then(res => {
                console.log(res);
                // this.twitchAccessToken = res.data.access_token;
            })
        }

    },
    mounted() {
        this.fetchToken()
    }
}
</script>
<template>

</template>
