<template>
  <Loading v-if="globalStore.pageIsLoading" />
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

const { $baseUrl } = useNuxtApp();
const baseUrl = $baseUrl();

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
  ogUrl: baseUrl,
  ogSiteName: baseUrl,
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  watch(() => ({ pageIsLoading }), value => {
    document.querySelector('body').dataset.noscroll = value.pageIsLoading.value;
  }, { deep: true });

  useSeoMeta({
    robots: {
      'noindex': (i18n.locale.value === 'pl' && useRequestURL().host !== 'newtrendy.pl') || (useRequestURL().host !== 'newtrendy.eu' && i18n.locale.value !== 'pl'),
      'nofollow': (i18n.locale.value === 'pl' && useRequestURL().host !== 'newtrendy.pl') || (useRequestURL().host !== 'newtrendy.eu' && i18n.locale.value !== 'pl'),
    },
  })
})
</script>

<style lang="postcss">
@import '~/assets/css/main.css';
@import '~/assets/css/breuer.css';
</style>
