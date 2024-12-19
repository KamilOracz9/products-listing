import pages from './lang/pages.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: 3001,
  },
  routeRules: {
    '/en/serwis/': { redirect: { to: '/en/', statusCode: 301 } },
    '/en/o_firmie/': { redirect: { to: '/en/about/', statusCode: 301 } },
    '/en/produkty/': { redirect: { to: '/en/products/', statusCode: 301 } },
    '/en/architects-area/': { redirect: { to: '/en/for-professionals/', statusCode: 301 } },
    '/en/information-clause/': { redirect: { to: '/en/information-clausue/', statusCode: 301 } },
    '/en/inspiracje/': { redirect: { to: '/en/blog/', statusCode: 301 } },
    '/en/protective-coatings/': { redirect: { to: '/en/', statusCode: 301 } },
    '/en/en/na_wymiar/': { redirect: { to: '/en/products/made-to-measure/', statusCode: 301 } },
    '/sk/ochranne-natery/': { redirect: { to: '/sk/', statusCode: 301 } },
    '/sk/oblast-architekta/': { redirect: { to: '/sk/pre-profesionalov/', statusCode: 301 } },
    '/en/nasze-kolekcje/': { redirect: { to: '/en/our-collections/', statusCode: 301 } },
    '/de/nach-mass/': { redirect: { to: '/de/produkte/massgeschneidert/', statusCode: 301 } },
    '/en/where-to-buy/': { redirect: { to: '/en/contact/#export-department', statusCode: 301 } },
    '/en/strefa-partnera/': { redirect: { to: '/en/for-professionals/', statusCode: 301 } },
    '/en/strefa-architekta/': { redirect: { to: '/en/for-professionals/', statusCode: 301 } },
    '/en/product-category/bathtub-screens/': { redirect: { to: '/en/products/bathtub-screen', statusCode: 301 } },
    '/en/categories/': { redirect: { to: '/en/products/', statusCode: 301 } },
    '/de/datenschutzbestimmungen/': { redirect: { to: '/de/datenschutz', statusCode: 301 } },
    '/de/bereich-des-partners/': { redirect: { to: '/de/fuer-profis/', statusCode: 301 } },
    '/de/visio-slim-modernes-linienentwaesserungssystem/': { redirect: { to: '/de/', statusCode: 301 } },
    '/en/product/avexa-shower-enclosure-pentagonal/': { redirect: { to: '/en/products?series[]=2&product_color[]=10&product_detail_finishing[]=16&product_shape[]=119', statusCode: 301 } },
    '/de/geschichte-auszeichnungen-karriere-eu/': { redirect: { to: '/de/ueber-uns/', statusCode: 301 } },
    '/de/produkt/avexa-schwarze-nischentur/': { redirect: { to: '/de/produkte/nischenturen?series[]=2&product_color[]=11', statusCode: 301 } },
    '/en/product/suvia-shower-cabin-square/': { redirect: { to: '/en/products/shower-enclosures?series[]=24', statusCode: 301 } },
  },
  experimental: { defaults: { nuxtLink: { trailingSlash: 'append' } } },
  nitro: {
    externals: {
      traceOptions: { base: process.cwd() }
    },
    routeRules: {
      "/img/**": { headers: { 'cache-control': `public,max-age=31536000,s-maxage=31536000` } },
      "/_nuxt/**": { headers: { 'cache-control': `public,max-age=31536000,s-maxage=31536000` } },
    }
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