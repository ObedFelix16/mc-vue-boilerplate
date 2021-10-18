const appConfig = require('./src/app.config.json')

/** @type import('@vue/cli-service').ProjectOptions */

module.exports = {
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', appConfig.title)

    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    config.resolve.extensions.delete('.vue')

    // Only enable performance hints for production builds,
    // outside of tests.
    config.performance.hints(
      process.env.NODE_ENV === 'production' &&
        !process.env.VUE_APP_TEST &&
        'warning'
    )
  },

  css: {
    // Enable CSS source maps.
    // sourceMap: true,
    // Automatically import sass variables, mixins and functions.
    // loaderOptions: {
    //   sass: {
    //     additionalData: '@use "@/design/design.scss";',
    //   },
    // },
  },

  pluginOptions: {
    // Configure vue-i18n
    i18n: {
      enableInSFC: true,
    },
  },

  pwa: {
    name: appConfig.title,
    themeColor: '#0047ba',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',

    manifestOptions: {
      start_url: '/?utm_source=pwa',
    },

    // workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc: 'src/service-worker.js',
      skipWaiting: true,
      exclude: [/web.config/],
    },
  },
}
