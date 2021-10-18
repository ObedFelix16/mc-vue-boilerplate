// Register each file as a corresponding Vuex module. Module nesting
// will mirror [sub-]directory hierarchy and modules are namespaced
// as the camelCase equivalent of their file name.

import camelCase from 'lodash/camelCase'
import { Module } from 'vuex'

const modulesCache: { [key: string]: Module<any, any> } = {}
const storeData: Module<any, any> = { modules: {} }
;(function updateModules(): void {
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireModule = require.context(
    // Search for files in the current directory
    '.',
    // Search for files in subdirectories
    true,
    // Include any .ts files that are not this file, helpers, types or a unit test.
    /^((?!index\.helpers\.types\.spec\.).)*\.ts$/
  )

  requireModule.keys().forEach((fileName) => {
    const moduleDefinition: Module<any, any> = requireModule(fileName).default

    // Skip the module during hot reload if it refers to the
    // same module definition as the one we have cached.
    if (modulesCache[fileName] === moduleDefinition) return

    // Update the module cache, for efficient hot reloading.
    modulesCache[fileName] = moduleDefinition

    // Get the module path as an array
    const modulePath = fileName
      // Remove the "./" from the beginning
      .replace(/^\.\//, '')
      // Remove the file extension from the end
      .replace(/\.\w+$/, '')
      // Split nested modules into an array path
      .split(/\//)
      // camelCase all module namespaces and names
      .map(camelCase)

    // Get the modules object for the current path
    let { modules } = getNamespace(storeData, modulePath)

    if (!modules) {
      modules = {}
    }

    // Add the module to our modules object
    modules[modulePath.pop() as string] = {
      // Modules are namespaced by default
      namespaced: true,
      ...moduleDefinition,
    } as Module<any, any>
  })

  // If the environment supports hot reloading...
  if (module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept(requireModule.id, () => {
      // Update `storeData.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      require('../index').default.hotUpdate({ modules: storeData.modules })
    })
  }
})()

// Recursively get the namespace of the module, even if nested
function getNamespace(
  subtree: Module<any, any>,
  path: string[]
): Module<any, any> {
  if (path.length === 1) return subtree

  if (!subtree.modules) {
    subtree.modules = {}
  }

  const namespace = path.shift()

  if (!namespace) return subtree

  subtree.modules[namespace] = {
    modules: {},
    namespaced: true,
    ...subtree.modules[namespace],
  }

  return getNamespace(subtree.modules[namespace], path)
}

export default storeData.modules
