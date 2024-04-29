import pages from './lang/pages.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    externals: {
      traceOptions: { base: process.cwd() }
    }
  },
  routeRules: {
    '/**': { swr: 3600 },
  },
  devtools: { enabled: true },
  hooks: {
    'build:manifest': (manifest) => {
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css

      if (css) {
        for (let i = css.length - 1; i >= 0; i--) {
          if (css[i].startsWith('entry')) css.splice(i, 1);
        }
      }
    },
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': 'postcss-nesting',
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
    'nuxt-aos',
    
  ],
  swiper: {
    modules: ['navigation', 'pagination', 'autoplay'],
  },
  plugins: [
    '@/plugins/device',
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
  swiper: {
    modules: ['autoplay', 'effect-creative', 'navigation', 'pagination'],
    prefix: 'Swiper',
    styleLang: 'css'
  }
})