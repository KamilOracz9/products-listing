<template>
  <NuxtLoadingIndicator />
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
const router = useRouter();

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: `https://newtrendy.pl${router.currentRoute.value.fullPath}`,
    },
    {
      rel: 'preconnect',
      href: 'https://newtrendy.pl',
    },
    {
      rel: 'preconnect',
      href: 'https://newtrendy.usermd.net',
    },
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
  script: {
    src: 'https://consent.cookiebot.com/uc.js?cbid=90e49277-0bdd-4186-9847-6827cbf3e895',
  }
}))

useSeoMeta({
  title: 'NEW TRENDY - Producent Kabin Prysznicowych',
  keywords: 'NEW TRENDY - Producent Kabin Prysznicowych',
  ogTitle: 'NEW TRENDY - Producent Kabin Prysznicowych',
  description: 'NEW TRENDY - Producent Kabin Prysznicowych',
  ogDescription: 'NEW TRENDY - Producent Kabin Prysznicowych',
  ogImage: logo,
  ogLocale: i18n.locale.value,
  ogUrl: `https://newtrendy.pl/${router.currentRoute.value.fullPath}`,
  ogSiteName: `https://newtrendy.pl/${router.currentRoute.value.fullPath}`,
  twitterCard: 'summary_large_image',
  // robots: {
  //   Disallow: '',
  //   Index: true,
  //   Follow: true,
  // },
})
</script>

<style lang="postcss">
@import '~/assets/css/main.css';
@import '~/assets/css/breuer.css';
</style>