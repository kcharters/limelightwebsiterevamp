import './assets/main.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import { createApp } from 'vue'

// Components
import App from './App.vue'
import router from './router'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa4'

// Custom theme properties
const customDarkTheme = {
  dark: true,
  colors: {
    background: "#303030",
    surface: "#303030",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "customDarkTheme",
    themes: {
      customDarkTheme,
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
