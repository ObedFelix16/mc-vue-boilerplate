import Communique from 'vue-communique'
import Vue from 'vue'
import components from './components/index'
import variants from './variants'

Vue.use(Communique, {
  // Enable or disabled automatic injection
  inject: true,
})

const communique = new Communique({
  components,
  defaults: {
    duration: 6000,
    transition: 'scale',
    component: 'BaseNotification',
    position: 'top-right',
  },
  variants,
})

export default communique
