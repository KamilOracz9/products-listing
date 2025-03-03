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
      '/kategoria-produktu/kabiny-prysznicowe/kwadratowe-prostokatne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?ksztalkt-produktu[]=kwadratowa', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/polokragle/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?ksztalkt-produktu[]=polokragla', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/pieciokatne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?ksztalkt-produktu[]=pieciokatna', statusCode: 301 } },
      '/kategoria-produktu/drzwi-wnekowe/drzwi-wahadlowe/': { redirect: { to: '/kategoria-produktu/drzwi-wnekowe?rodzaj-drzwi[]=drzwi-wahadlowe', statusCode: 301 } },
      '/kategoria-produktu/kabiny-walk-in/przesuwne/': { redirect: { to: '/kategoria-produktu/kabiny-walk-in?rodzaj-drzwi[]=drzwi-przesuwne', statusCode: 301 } },
      '/kategoria-produktu/brodziki-i-odwodnienia/brodziki-brodziki-i-odwodnienia/': { redirect: { to: '/kategoria-produktu/brodziki-i-odwodnienia/', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/kwadratowe-prostokatne/drzwi-skladane-kwadratowe-prostokatne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-skladane', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/przyscienne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?ksztalkt-produktu[]=kwadratowa-przyscienna', statusCode: 301 } },
      '/kategoria-produktu/parawany-nawannowe/wieloczesciowe-parawany-nawannowe/': { redirect: { to: '/kategoria-produktu/parawany-nawannowe?liczba-scianek[]=wieloczesciowe', statusCode: 301 } },
      '/kategoria-produktu/brodziki-i-odwodnienia/brodziki-brodziki-i-odwodnienia/brodziki-konglomeratowe-brodziki-brodziki-i-odwodnienia/': { redirect: { to: '/kategoria-produktu/brodziki?material[]=konglomeratowy', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/przyscienne/drzwi-przesuwne-przyscienne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-przesuwne', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/polokragle/drzwi-przesuwne-polokragle/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe/?ksztalkt-produktu[]=polokragla', statusCode: 301 } },
      '/kategoria-produktu/brodziki-i-odwodnienia/kratki-odplywowe-i-nozki-do-brodzikow/': { redirect: { to: '/kategoria-produktu/kratki-odplywowe-i-nozki-do-brodzikow/', statusCode: 301 } },
      '/kategoria-produktu/kabiny-walk-in/wieloczesciowe/': { redirect: { to: '/kategoria-produktu/kabiny-walk-in?liczba-scianek[]=wieloczesciowe', statusCode: 301 } },
      '/kategoria-produktu/parawany-nawannowe/jednoczesciowe-parawany-nawannowe/': { redirect: { to: '/kategoria-produktu/parawany-nawannowe?liczba-scianek[]=jednoczesciowe', statusCode: 301 } },
      '/kategoria-produktu/drzwi-wnekowe/drzwi-przesuwne/': { redirect: { to: '/kategoria-produktu/drzwi-wnekowe?rodzaj-drzwi[]=drzwi-przesuwne', statusCode: 301 } },
      '/kategoria-produktu/brodziki-i-odwodnienia/odwodnienia-liniowe/': { redirect: { to: '/kategoria-produktu/odwodnienia-liniowe/', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/kwadratowe-prostokatne/drzwi-przesuwne-kwadratowe-prostokatne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-przesuwne', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/kwadratowe-prostokatne/drzwi-wahadlowe-kwadratowe-prostokatne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-wahadlowe', statusCode: 301 } },
      '/kategoria-produktu/akcesoria-i-srodki-do-pielegnacji/srodki-do-pielegnacji/': { redirect: { to: '/kategoria-produktu/srodki-do-pielegnacji/', statusCode: 301 } },
      '/kategoria-produktu/brodziki-i-odwodnienia/syfony-brodzikowe/': { redirect: { to: '/kategoria-produktu/syfony-brodzikowe/', statusCode: 301 } },
      '/kategoria-produktu/drzwi-wnekowe/drzwi-otwierane-na-zewnatrz/': { redirect: { to: '/kategoria-produktu/drzwi-wnekowe?rodzaj-drzwi[]=drzwi-otwierane-na-zewnatrz', statusCode: 301 } },
      '/kategoria-produktu/drzwi-wnekowe/drzwi-skladane/': { redirect: { to: '/kategoria-produktu/drzwi-wnekowe?rodzaj-drzwi[]=drzwi-skladane', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/kwadratowe-prostokatne/drzwi-otwierane-na-zewnatrz-kwadratowe-prostokatne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-otwierane-na-zewnatrz', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/polokragle/drzwi-otwierane-na-zewnatrz-polokragle/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-otwierane-na-zewnatrz', statusCode: 301 } },
      '/kategoria-produktu/kabiny-walk-in/jednoczesciowe/': { redirect: { to: '/kategoria-produktu/kabiny-walk-in?liczba-scianek[]=jednoczesciowe', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/pieciokatne/drzwi-wahadlowe-pieciokatne/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-wahadlowe', statusCode: 301 } },
      '/kategoria-produktu/kabiny-prysznicowe/polokragle/drzwi-wahadlowe-polokragle/': { redirect: { to: '/kategoria-produktu/kabiny-prysznicowe?rodzaj-drzwi[]=drzwi-wahadlowe', statusCode: 301 } },
      '/czarne-kabiny-prysznicowe-inspiracje/': { redirect: { to: '/blog/inspiracje/czarne-kabiny-prysznicowe-inspiracje/', statusCode: 301 } },
      '/jak-uniknac-bledow-w-pomiarze-strefy-prysznica-i-dopasowaniu-odpowiedniego-rozmiaru-kabiny-prysznicowej/': { redirect: { to: '/blog/porady-i-wsparcie/jak-uniknac-bledow-w-pomiarze-strefy-prysznica-i-dopasowaniu-odpowiedniego-rozmiaru-kabiny-prysznicowej/', statusCode: 301 } },
      '/na_wymiar/': { redirect: { to: '/produkty/na-wymiar/', statusCode: 301 } },
      '/serwis-2/': { redirect: { to: '/serwis/', statusCode: 301 } },
      '/visio-slim-nowoczesny-system-odwodnien-liniowych/': { redirect: { to: '/blog/inspiracje/visio-slim-nowoczesny-system-odwodnien-liniowych/', statusCode: 301 } },
      '/zostalismy-finalista-konkursu-dobry-wzor/': { redirect: { to: '/blog/aktualnosci/zostalismy-finalista-konkursu-dobry-wzor/', statusCode: 301 } },
      '/katalog-produktow-new-trendy-2023/': { redirect: { to: '/blog/aktualnosci/katalog-produktow-new-trendy-2023/', statusCode: 301 } },
      '/architectwork-warsaw-2023/': { redirect: { to: '/blog/aktualnosci/architectwork-warsaw-2023/', statusCode: 301 } },
      '/uslugi-dodatkowe-w-ofercie-new-trendy/': { redirect: { to: '/blog/porady-i-wsparcie/uslugi-dodatkowe-w-ofercie-new-trendy/', statusCode: 301 } },
      '/powloki-ochronne-w-produktach-new-trendy/': { redirect: { to: '/blog/porady-i-wsparcie/powloki-ochronne-w-produktach-new-trendy/', statusCode: 301 } },
      '/inspiracje/': { redirect: { to: '/blog/', statusCode: 301 } },
      '/strefa-architekta/': { redirect: { to: '/dla-profesjonalistow/#strefa-architekta', statusCode: 301 } },
      '/strefa-partnera/': { redirect: { to: '/dla-profesjonalistow/#strefa-partnera', statusCode: 301 } },
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
            && !route[0].includes('product')
            && !route[0].includes('place-to-buy')
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
    'nuxt-schema-org',
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