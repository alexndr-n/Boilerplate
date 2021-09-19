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
    host: '0' // default: localhost
  },

  css: [
    '@/assets/css/join',
  ],

  plugins: [
  ],

  components: true,

  buildModules: [],

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.NODE_ENV == 'production' ? 'http://localhost/api' : 'http://localhost:3001', // Used as fallback if no runtime config is provided
  },

  build: {}
}
