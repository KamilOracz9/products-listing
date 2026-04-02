import pages from './lang/pages.json';

const routeRules = Object.fromEntries(
  Object.entries(pages).flatMap(([route, languages]) => {
    const regex = /^(index|.*(products).*|products\/[^/]+\/index)$/

    if (regex.test(route)) {
      return Object.entries(languages).map(([language, data]) => {
        // Handle Polish as default locale (no prefix)
        const languagePrefix = language === 'pl' ? '' : `/${language}`;
        const routePath = route === 'index' ? '/' : (data ?? data.static?.body ?? '').replace(/\[.*?\]/g, "*");

        if (route === 'index') {
          return [languagePrefix || '/', { swr: true }];
        } else {
          return [`${languagePrefix}${routePath}`, { swr: true }];
        }
      })
    }
  }).filter(item => item)
);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  runtimeConfig: {
    public: {
      cookiebotToken: process.env.COOKIEBOT_TOKEN,
      gtmToken: process.env.GTM_TOKEN,
    }
  },
  ssr: true,
  experimental: { defaults: { nuxtLink: { trailingSlash: 'append' } }, inlineRouteRules: true },
  router: {
    options: {
      strict: false,
    }
  },
  nitro: {
    externals: {
      traceOptions: { base: process.cwd() }
    },
    // prerender: {
    //   routes: process.env.PRERENDER_ROUTES
    //     ? process.env.PRERENDER_ROUTES.split(',')
    //     : ['/', '/produkty', '/kategoria-produktu/drzwi-wnekowe', '/kategoria-produktu/kabiny-prysznicowe', '/kategoria-produktu/kabiny-walk-in',
    //       '/kategoria-produktu/parawany-nawannowe', '/kategoria-produktu/brodziki-i-odwodnienia', '/kategoria-produktu/akcesoria-i-srodki-do-pielegnacji'] // domyślnie wszystkie
    // },
    routeRules: {
      // ...routeRules,
      '/': { prerender: true },
      '/produkty': { prerender: true },
      '/kategoria-produktu/drzwi-wnekowe': { prerender: true },
      '/kategoria-produktu/kabiny-prysznicowe': { prerender: true },
      '/kategoria-produktu/kabiny-walk-in': { prerender: true },
      '/kategoria-produktu/parawany-nawannowe': { prerender: true },
      '/kategoria-produktu/brodziki-i-odwodnienia': { prerender: true },
      '/kategoria-produktu/akcesoria-i-srodki-do-pielegnacji': { prerender: true },
    },
    preset: 'node-server',
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
    '@nuxtjs/i18n',
    'nuxt-swiper',
    ['@nuxtjs/robots', { configPath: "~/config/robots.config" }],
    'nuxt-aos',
    '@nuxt/image',
    'nuxt-schema-org',
    'nuxt-toast'
  ],

  schemaOrg: {
    defaults: false
  },

  image: {
    dir: 'assets/images',
  },

  swiper: {
    modules: ['navigation', 'pagination', 'autoplay'],
  },

  plugins: [
    '@/plugins/device',
    '@/plugins/error-handler',
    '@/plugins/router',
    '@/plugins/locale',
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
      {
        code: 'de',
        iso: 'de_DE',
        file: 'de-DE.json',
      },
      {
        code: 'ro',
        iso: 'ro_RO',
        file: 'ro-RO.json',
      },
      {
        code: 'uk',
        iso: 'uk_UA',
        file: 'uk-UA.json',
      },
      {
        code: 'sk',
        iso: 'sk_SK',
        file: 'sk-SK.json',
      },
      {
        code: 'cs',
        iso: 'cs_CZ',
        file: 'cs-CZ.json',
      },
      {
        code: 'hu',
        iso: 'hu_HU',
        file: 'hu-HU.json',
      },
      {
        code: 'et',
        iso: 'et_EE',
        file: 'et-EE.json',
      },
      {
        code: 'lv',
        iso: 'lv_LV',
        file: 'lv-LV.json',
      },
      {
        code: 'lt',
        iso: 'lt_LT',
        file: 'lt-LT.json',
      },
      {
        code: 'fr',
        iso: 'fr_FR',
        file: 'fr-FR.json',
      },
    ],
    defaultLocale: 'pl',
    lazy: true,
    langDir: 'lang/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    customRoutes: 'config',
    pages: pages,
  },
  compatibilityDate: '2024-07-31',
})