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
      favicon32: 'pwa/moonstonks.png',
      favicon16: 'pwa/moonstonks.png',
      appleTouchIcon: 'pwa/splash/apple-icon-180.png',
      maskIcon: 'pwa/moonstonks.png',
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
