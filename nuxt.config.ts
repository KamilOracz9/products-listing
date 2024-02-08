import pages from './lang/pages.json'

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
    '@nuxtjs/i18n',
    'nuxt-swiper',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      apiProtocol: process.env.API_PROTOCOL,
    },
  },
  plugins: [
    '@/plugins/device',
  ],
  pages: true,
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
      },
      {
        code: 'pl',
        iso: 'pl-PL',
        file: 'pl-PL.json',
      },
    ],
    defaultLocale: 'pl',
    lazy: true,
    langDir: 'lang/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    customRoutes: 'config',
    pages: pages,
    // pages: {
    //   'service/index': {
    //     "en": "/service",
    //     "pl": "/serwis"
    //   },
    //   'products/index': {
    //     "en": "/products",
    //     "pl": "/produkty"
    //   },
    //   'products/[slug]': {
    //     "en": "/products/[slug]",
    //     "pl": "/produkty/[slug]"
    //   },
    //   'products/[category]/index': {
    //     "en": "/products/[category]",
    //     "pl": "/produkty/[category]"
    //   },
    //   'categories/index': {
    //     "en": "/categories",
    //     "pl": "/kategorie"
    //   },
    //   'categories/[category]/index': {
    //     "en": "/categories/[category]",
    //     "pl": "/kategorie/[category]"
    //   },
    //   'place-to-buy/index': {
    //     "en": "/place-to-buy",
    //     "pl": "/gdzie-kupic-nasze-produkty"
    //   },
    //   'inspirations/index': {
    //     "en": "/inspirations",
    //     "pl": "/inspiracje"
    //   },
    //   'inspirations/[category]/index': {
    //     "en": "/inspirations/[category]",
    //     "pl": "/inspiracje/[category]"
    //   },
    //   'inspirations/[category]/[slug]': {
    //     "en": "/inspirations/[category]/[slug]",
    //     "pl": "/inspiracje/[category]/[slug]"
    //   },
    //   'for-professionals/index': {
    //     "en": "/for-professionals",
    //     "pl": "/dla-profesjonalistow"
    //   },
    //   'contact/index': {
    //     "en": "/contact",
    //     "pl": "/kontakt"
    //   },
    //   'about/index': {
    //     "en": "/about",
    //     "pl": "/o-firmie"
    //   },
    // }
  },
})