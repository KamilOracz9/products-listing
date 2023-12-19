// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt3-leaflet',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      apiProtocol: process.env.API_PROTOCOL,
      expiredStatusesColors: {
        'green': '#0a8d11',
        'yellow': '#F2EB1D',
        'red': '#DB261A',
        'black': '#000',
      }
    },
  },
})