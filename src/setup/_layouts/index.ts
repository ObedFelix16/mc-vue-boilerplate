// Globally register the Layout components for convenience because
// they will be used very frequently.

import Vue from 'vue'

const requireComponent = require.context('@/layouts/', false, /[\w]+\.vue$/)

requireComponent.keys().forEach((fileName: string) => {
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
