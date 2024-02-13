<template>
  <NuxtLayout name="main">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import logo from '@/assets/images/logo.svg';
const i18n = useI18n();

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: 'https://newtrendy.pl',
    },
  ],
  htmlAttrs: {
    lang: i18n.locale.value
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
  ogUrl: 'https://newtrendy.pl',
  ogSiteName: 'newtrendy.pl',
  twitterCard: 'summary_large_image',
  robots: {
    UserAgent: '*',
    Disallow: '',
    Index: true,
    Follow: true,
  }
})
</script>