<template>
  <Loading v-if="globalStore.pageIsLoading" />
  <NuxtLayout name="main">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
onMounted(() => {
  useSeoMeta({
    robots: {
      'noindex': true,
      'nofollow': true,
    },
  })
})
</script>

<style lang="postcss">
@import '~/assets/css/main.css';
@import '~/assets/css/breuer.css';
</style>
