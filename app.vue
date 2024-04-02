<template>
  <NuxtLayout name="main">
    <Suspense>
      <NuxtPage />
      <template #fallback>
        <LoadingIndicator />
      </template>
    </Suspense>
  </NuxtLayout>
</template>

<script setup>
import logo from '@/assets/images/logo.svg';
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
  ogUrl: `https://newtrendy.pl${router.currentRoute.value.fullPath}`,
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

<style lang="postcss">
@import '~/assets/css/main.css';
@import '~/assets/css/breuer.css';
</style>