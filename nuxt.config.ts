// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css', 
    '~/assets/css/breuer.css', 
    '~/assets/css/aller.css', 
    '~/assets/css/minion-pro.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt3-leaflet',
    '@pinia/nuxt',
    'nuxt-lodash',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      apiProtocol: process.env.API_PROTOCOL,
    },
  },
  plugins: [
    '@/plugins/device',
  ]
})