export default {
  head: {
    title: 'test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  server: {
    host: '0'
  },

  css: [
    '@/assets/css/join',
  ],

  router: {
    middleware: 'reset-notification'
  },

  plugins: [{ src: '~/plugins/persistedState.client.js' }, { src: '~/plugins/notification.js' },'~/api/init.js'],

  components: true,

  buildModules: [],

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.NODE_ENV == 'production' ? 'http://server:3001' : 'http://localhost:3001',
    browserBaseURL: process.env.NODE_ENV == 'production' ? '/api' : 'http://localhost:3001',
  },

  build: {
    extend(config, ctx) {}
  }
}
