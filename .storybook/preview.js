import '@/design/system/tokens.css'
import '@/design/main.scss'
import '@/index.css'

import Vue from 'vue'

// Import Vue plugins
import Vuex from 'vuex'
import VueCompositionApi from '@vue/composition-api'

// Install Vue plugins.
Vue.use(Vuex)
Vue.use(VueCompositionApi)

// Import your global components.
const requireComponent = require.context(
  '../src/components/_base',
  false,
  /Base[\w]+\.vue$/
)

requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)

  // The components should be in PascalCase
  const componentName = fileName
    // Remove the "./" from the beginning
    .replace(/^\.\//, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
