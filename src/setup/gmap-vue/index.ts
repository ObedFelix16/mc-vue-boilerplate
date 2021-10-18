import appConfig from '@/app.config.json'
import * as GmapVue from 'gmap-vue'
import Vue from 'vue'

Vue.use(GmapVue, {
  load: {
    key:
      process.env.NODE_ENV === 'production'
        ? appConfig.google.maps.production.apiKey
        : appConfig.google.maps.test.apiKey,
  },
  installComponents: true,
})
