import pages from './lang/pages.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: 3001,
  },
  experimental: { defaults: { nuxtLink: { trailingSlash: 'append' } }, inlineRouteRules: true },
  nitro: {
    externals: {
      traceOptions: { base: process.cwd() }
    },
    routeRules: {
      "/img/**": { headers: { 'cache-control': `public,max-age=31536000,s-maxage=31536000` } },
      "/_nuxt/**": { headers: { 'cache-control': `public,max-age=31536000,s-maxage=31536000` } },
    },
    preset: 'node-server',
    hooks: {
      "prerender:routes"(routes) {
        // routes.pu
        Object.entries(pages).filter(route => {
          return !route[0].includes('products')
            && !route[0].includes('blog')
            && !route[0].includes('categories')
            && !route[0].includes('search')
        }).map(route => Object.entries(route[1]).map(lang => lang[0] === 'pl' ? lang[1] : `/${lang[0]}${lang[1]}`)).flat().forEach(element => {
          routes.add(element);
        });

        routes.add("/");
        routes.add("/en");
        routes.add("/de");
        routes.add("/fr");
        routes.add("/it");
        routes.add("/es");
        routes.add("/no");
        routes.add("/sk");
        routes.add("/cs");
        routes.add("/ro");
        routes.add("/ru");
        routes.add("/uk");
        routes.add("/hu");
        routes.add("/et");
        routes.add("/lv");
        routes.add("/lt");
      }
    },
  },

  hooks: {
    'build:manifest': (manifest) => {
      // find the app entry, css list
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css
      if (css) {
        // start from the end of the array and go to the beginning
        for (let i = css.length - 1; i >= 0; i--) {
          // if it starts with 'entry', remove it from the list
          if (css[i].startsWith('entry')) css.splice(i, 1)
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
    '@nuxtjs/i18n',
    'nuxt-swiper',
    ['@nuxtjs/robots', { configPath: "~/config/robots.config" }],
    'nuxt-aos',
    '@nuxt/image',
  ],

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