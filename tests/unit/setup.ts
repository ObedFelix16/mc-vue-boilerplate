// https://vue-test-utils.vuejs.org/
import * as vueTestUtils from '@vue/test-utils'
import axios from 'axios'
import fs from 'fs'
// https://lodash.com/
import _ from 'lodash'
import path from 'path'
import Vue from 'vue'
import Vuex from 'vuex'

const nodeGlobal: typeof global & Record<string, any> = global

// ===
// Configure i18n
// ===

// https://vue-test-utils.vuejs.org/api/options.html#mocks
vueTestUtils.config.mocks = vueTestUtils.config.mocks || {}

// Mock the $t function from vue-i18n,
// we do not care about the translation itself,
// so we just use a default string value
vueTestUtils.config.mocks['$t'] = () => 'Default translation value'

// ===
// Configure Axios
// ===

// Force Axios to use the XHR adapter so that it behaves
// more like it would in a browser environment.
axios.defaults.adapter = require('axios/lib/adapters/xhr')

// ===
// Configure Vue
// ===

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance
// for tests.
Vue.config.productionTip = false

// ===
// Register global components
// ===

const globalComponentFiles = fs
  .readdirSync(path.join(__dirname, '../../src/components/_base'))
  .filter((fileName) => /Base[\w]+\.vue$/.test(fileName))

for (const fileName of globalComponentFiles) {
  // The components should be in PascalCase
  const componentName = fileName
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
  // @typescript-eslint:disable-next-line
  const componentConfig = require('../../src/components/_base/' + fileName)
  Vue.component(componentName, componentConfig.default || componentConfig)
}

// ===
// Mock window properties not handled by jsdom
// ===

Object.defineProperty(window, 'localStorage', {
  value: (() => {
    let store: Record<string, unknown> = {}
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: unknown) => (store[key] = `${value}`),
      clear: () => (store = {}),
    }
  })(),
})

// ===
// Console handlers
// ===

// Make console.error throw, so that Jest tests fail
const error = console.error
console.error = (message: Error | string, ...args: [any?, ...any[]]) => {
  error.apply(console, args)
  // NOTE: You can whitelist some `console.error` messages here
  //       by returning if the `message` value is acceptable.
  throw message instanceof Error ? message : new Error(message)
}

// Make console.warn throw, so that Jest tests fail
const warn = console.warn
console.warn = (message: Error | string, ...args: [any?, ...any[]]) => {
  warn.apply(console, args)
  // NOTE: You can whitelist some `console.warn` messages here
  //       by returning if the `message` value is acceptable.
  throw message instanceof Error ? message : new Error(message)
}

// ===
// Global helpers
// ===

// https://vue-test-utils.vuejs.org/api/#mount
nodeGlobal.mount = vueTestUtils.mount

// https://vue-test-utils.vuejs.org/api/#shallowmount
nodeGlobal.shallowMount = vueTestUtils.shallowMount

// A helper for creating Vue component mocks
nodeGlobal.createComponentMocks = ({
  store,
  router,
  mocks,
  stubs,
}: {
  store: any
  router: boolean
  mocks: typeof vueTestUtils.config.mocks
  stubs: typeof vueTestUtils.config.stubs
}) => {
  // Use a local version of Vue, to avoid polluting the global
  // Vue and thereby affecting other tests.
  // https://vue-test-utils.vuejs.org/api/#createlocalvue
  const localVue = vueTestUtils.createLocalVue()
  const returnOptions: Record<string, any> = { localVue }

  // https://vue-test-utils.vuejs.org/api/options.html#stubs
  returnOptions.stubs = stubs || {}
  // https://vue-test-utils.vuejs.org/api/options.html#mocks
  returnOptions.mocks = mocks || {}

  // Converts a `store` option shaped like:
  //
  // store: {
  //   someModuleName: {
  //     state: { ... },
  //     getters: { ... },
  //     actions: { ... },
  //   },
  //   anotherModuleName: {
  //     getters: { ... },
  //   },
  // },
  //
  // to a store instance, with each module namespaced by
  // default, just like in our app.
  if (store) {
    localVue.use(Vuex)
    returnOptions.store = new Vuex.Store({
      modules: Object.keys(store)
        .map((moduleName) => {
          const storeModule = store[moduleName]
          return {
            [moduleName]: {
              state: storeModule.state || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced:
                typeof storeModule.namespaced === 'undefined'
                  ? true
                  : storeModule.namespaced,
            },
          }
        })
        .reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {}),
    })
  }

  // If using `router: true`, we'll automatically stub out
  // components from Vue Router.
  if (router) {
    returnOptions.stubs['router-link'] = true
    returnOptions.stubs['router-view'] = true
  }

  return returnOptions
}

nodeGlobal.createModuleStore = (
  vuexModule: Record<string, any>,
  options: Record<string, any> = {}
) => {
  vueTestUtils.createLocalVue().use(Vuex)
  const store = new Vuex.Store({
    ..._.cloneDeep(vuexModule),
    modules: {
      auth: {
        namespaced: true,
        state: {
          currentUser: options.currentUser,
        },
      },
    },
    // Enable strict mode when testing Vuex modules so that
    // mutating state outside of a mutation results in a
    // failing test.
    // https://vuex.vuejs.org/guide/strict.html
    strict: true,
  })
  axios.defaults.headers.common.Authorization = options.currentUser
    ? options.currentUser.token
    : ''
  if (vuexModule.actions.init) {
    store.dispatch('init')
  }
  return store
}
