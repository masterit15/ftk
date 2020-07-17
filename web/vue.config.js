module.exports = {
  // ...настройки других vue-cli плагинов...
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    // настройки манифеста
    manifestOptions: {
      display: 'landscape',
      background_color: '#42B883'
      // ...другие настройки манифеста...
    },

    // настройка workbox-плагина
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc необходимо в режиме InjectManifest
      swSrc: 'public/service-worker.js',
      // ...другие настройки Workbox...
    }
  }
}