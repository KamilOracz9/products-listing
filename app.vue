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

nuxtApp.hook("page:start", () => {
  pageIsLoading.value = true;
});
nuxtApp.hook("page:finish", () => {
  pageIsLoading.value = false;
});

useHead(() => ({
  link: [
    // {
    //   rel: 'canonical',
    //   href: nuxtApp.$canonical(),
    // },
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
  // script: {
  //   src: 'https://consent.cookiebot.com/uc.js?cbid=90e49277-0bdd-4186-9847-6827cbf3e895',
  // }
}))

useSeoMeta({
  title: 'Producent kabin prysznicowych. Kabiny prysznicowe na wymiar | NEW TRENDY',
  ogImage: logo,
  ogLocale: i18n.locale.value,
  ogUrl: url.href,
  ogSiteName: url.href,
  twitterCard: 'summary_large_image',
})

useSeoMeta({
    robots: {
      'noindex': (nuxtApp.$isNewtrendyEU ? i18n.locale.value !== 'pl' : true) || (nuxtApp.$isNewtrendyPL ? i18n.locale.value === 'pl' : true),
      'nofollow': (nuxtApp.$isNewtrendyEU ? i18n.locale.value !== 'pl' : true) || (nuxtApp.$isNewtrendyPL ? i18n.locale.value === 'pl' : true),
    },
  })

onMounted(() => {
  watch(() => ({ pageIsLoading }), value => {
    document.querySelector('body').dataset.noscroll = value.pageIsLoading.value;
  }, { deep: true });
})
</script>

<style lang="postcss">
@import '~/assets/css/main.css';
@import '~/assets/css/breuer.css';
</style>