import '../node_modules/font-awesome/css/font-awesome.min.css'
import './assets/main.css'

import { createApp } from 'vue'

// Components
import App from './App.vue'
import router from './router'

// Vuetify
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import { VueReCaptcha } from 'vue-recaptcha-v3';

import { customDarkTheme, customLightTheme } from './theme.js'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "customDarkTheme",
    themes: {
      customDarkTheme,
      customLightTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
})

createApp(App).use(router).use(vuetify).use(VueReCaptcha, {
  siteKey: import.meta.env.RECAPTCHA_SECRET, // from Google reCAPTCHA v3
  loaderOptions: {
    autoHideBadge: true,
  },
}).mount('#app')
