module.exports = {
  pwa: {
    manifestOptions: {
      display: 'fullscreen',
      start_url: '.',
    },
    name: 'Photos',
    themeColor: '#000',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    iconPaths: {
      favicon32: 'pwa/logo.png',
      favicon16: 'pwa/logo.png',
      appleTouchIcon: 'pwa/splash/apple-icon-180.png',
      maskIcon: 'pwa/logo.png',
      msTileImage: 'pwa/splash/manifest-icon-512.png',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData:
          "@import '@/scss/_variables.scss';\n@import '@/scss/_mixins.scss';",
      },
    },
  },
};
