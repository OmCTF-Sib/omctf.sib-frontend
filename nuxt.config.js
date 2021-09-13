import colors from 'vuetify/es5/util/colors'

const env = require('dotenv').config()

export default {
  env: env.parsed,
  head: {
    title: 'OmCTF.Sib',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  css: [
    '~/assets/main.scss',
  ],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
  ],
  proxy: {
    '/api': process.env.BASE_API_URL,
    '/media': process.env.BASE_API_URL,
  },
  axios: {
    proxy: true,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/auth/jwt/create/',
            method: 'post',
            propertyName: 'access',
          },
          logout: false,
          user: {
            url: '/api/v1/auth/users/me/',
            methods: 'get',
            propertyName: '',
          },
        },
        tokenType: 'JWT',
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
    },
  },
  googleFonts: {
    families: {
      'Anonymous Pro': [ 300, 400, 700, 800 ],
    },
  },
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: null,
      icons: 'mdi',
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#20c20e',
          accent: '#fb145f',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
}
