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
            let url = "https://id.twitch.tv/oauth2/token"
            fetch(url, {
                method: 'post',
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Content-Type': 'x-www-form-urlencoded',
                },
                body: {
                    'client_id': client_id,
                    'client_secret': client_secret,
                    "grant_type": 'client_credentials'
                }
            }).then(res => {
                console.log("Token generated => " + res);
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
