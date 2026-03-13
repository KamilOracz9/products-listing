<template>
  <Loading v-if="shouldShowLoading" />
  <NuxtLayout name="main">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import logo from '@/assets/images/logo.svg';
import BreuerBold from '~/assets/fonts/BreuerText-Bold.ttf?url';
import BreuerLight from '~/assets/fonts/BreuerText-Light.ttf?url';
import BreuerMedium from '~/assets/fonts/BreuerText-Medium.ttf?url';
import BreuerRegular from '~/assets/fonts/BreuerText-Regular.ttf?url';

const i18n = useI18n();
const nuxtApp = useNuxtApp();
const globalStore = useGlobalStore();
const { pageIsLoading } = storeToRefs(globalStore);
const url = useRequestURL();
const runtimeConfig = useRuntimeConfig()
const route = useRoute();

const { $baseUrl } = useNuxtApp();
const baseUrl = $baseUrl();

// Check if current route is product category page and should skip loading
const shouldShowLoading = computed(() => {
  if (!pageIsLoading.value) return false;
  
  // Debug: log route info
  console.log('Route name:', route.name, 'Route path:', route.path);
  
  const isProductCategoryPage = route.name && (
    route.name.startsWith('products-category') ||
    route.name === 'products-category___en' ||
    route.name === 'products-category___pl' ||
    route.name === 'products-category___de' ||
    route.name === 'products-category___fr' ||
    route.name === 'products-category___it' ||
    route.name === 'products-category___es' ||
    route.name === 'products-category___no' ||
    route.name === 'products-category___sk' ||
    route.name === 'products-category___cs' ||
    route.name === 'products-category___ro' ||
    route.name === 'products-category___ru' ||
    route.name === 'products-category___uk' ||
    route.name === 'products-category___hu' ||
    route.name === 'products-category___et' ||
    route.name === 'products-category___lv' ||
    route.name === 'products-category___lt'
  );
  
  console.log('Is product category page:', isProductCategoryPage);
  
  return !isProductCategoryPage;
});

nuxtApp.hook("page:start", () => {
  pageIsLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
  pageIsLoading.value = false;
});

useHead(() => ({
  link: [
    {
      rel: 'preload',
      type: 'font/ttf',
      href: BreuerBold,
      as: 'font',
      crossorigin: ''
    },
    {
      rel: 'preload',
      type: 'font/ttf',
      href: BreuerLight,
      as: 'font',
      crossorigin: ''
    },
    {
      rel: 'preload',
      type: 'font/ttf',
      href: BreuerMedium,
      as: 'font',
      crossorigin: ''
    },
    {
      rel: 'preload',
      type: 'font/ttf',
      href: BreuerRegular,
      as: 'font',
      crossorigin: ''
    },
  ],
  htmlAttrs: {
    lang: i18n.locale.value
  },
  noscript: [{
    innerHTML: `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${runtimeConfig.public.gtmToken}" 
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `,
    tagPosition: 'bodyOpen'
  }],
  script: [
    {
      'data-culture': i18n.locale.value,
      src: `https://consent.cookiebot.com/uc.js?cbid=${runtimeConfig.public.cookiebotToken}`,
      tagPosition: 'bodyClose',
    },
    {
      type: 'text/javascript',
      innerHTML: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 

        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 

        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 

        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 

        })(window,document,'script','dataLayer','${runtimeConfig.public.gtmToken}');
      `
    },
  ],
}))

useSeoMeta({
  ogImage: logo,
  ogLocale: i18n.locale.value,
  ogUrl: baseUrl.value.fullUrl,
  ogSiteName: baseUrl.value.domain,
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  watch(() => ({ pageIsLoading }), value => {
    document.querySelector('body').dataset.noscroll = value.pageIsLoading.value;
  }, { deep: true });

  useSeoMeta({
    robots: {
      'noindex': (i18n.locale.value === 'pl' && !baseUrl.value.domain.includes('newtrendy.pl')) || 
                (!baseUrl.value.domain.includes('newtrendy.eu') && i18n.locale.value !== 'pl'),
      'nofollow': (i18n.locale.value === 'pl' && !baseUrl.value.domain.includes('newtrendy.pl')) || 
                (!baseUrl.value.domain.includes('newtrendy.eu') && i18n.locale.value !== 'pl'),
    },
  })
})
</script>

<style lang="postcss">
@import '~/assets/css/main.css';
@import '~/assets/css/breuer.css';
</style>
