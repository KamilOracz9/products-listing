<template>
  <section>
    <ProductsLayout v-if="categoryStore.breadcrumbs" :title="$t('products')" :breadcrumbs="categoryStore.breadcrumbs"
      :shortText="categoryStore.shortText" :longText="categoryStore.longText">
    </ProductsLayout>
  </section>
</template>
  
<script setup lang="ts">
import ProductsLayout from '@/layouts/ProductsLayout.vue';
const categoryStore = useCategoryStore();

useSeoMeta({
  title: 'NEW TRENDY - Produkty',
  keywords: 'NEW TRENDY - Produkty',
  description: 'NEW TRENDY - Produkty',
  ogTitle: 'NEW TRENDY - Produkty',
  ogDescription: 'NEW TRENDY - Produkty',
})
</script>