import Vue from 'vue'
import './setup/vue-composition-api'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import i18n from './setup/i18n'
import communique from './notification'
import './setup/_base'
import './setup/_layouts'
import './setup/fonts'
import './setup/meta'
import './setup/portal-vue'
import './setup/vue-tippy'
import './setup/v-click-outside'
import './setup/v-calendar'
import './setup/vue-multiselect'
import './setup/vue-mugen-scroll'
import './setup/vee-validate'
import './setup/vue-slider-component'
import './setup/vue-awesome-swiper'
import './setup/vue-observe-visibility'
import './setup/vue-good-table'
import './setup/vue-the-mask'
import './setup/gmap-vue'
import './registerServiceWorker'
import './index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  communique,
  render: (h) => h(App),
}).$mount('#app')
