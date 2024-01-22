<template>
  <MainLayout>
    <div>
      {{ $t('products') }}
    </div>
  </MainLayout>
</template>
  
<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';

defineI18nRoute({
  paths: {
    en: '/products',
    pl: '/produkty',
  }
})
</script>