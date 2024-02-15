import pages from './lang/pages.json'
import imagesConfig from './config/images.config';

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
    ['@nuxtjs/robots', { configPath: "~/config/robots.config" }],
    '@nuxt/image',
    'nuxt-aos',
  ],
  image: imagesConfig,
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      apiProtocol: process.env.API_PROTOCOL,
    },
  },
  plugins: [
    '@/plugins/device',
    '@/plugins/slugify',
    '@/plugins/useSlideTo',
  ],
  pages: true,
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en_US',
        file: 'en-US.json',
      },
      {
        code: 'pl',
        iso: 'pl_PL',
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
  },
})