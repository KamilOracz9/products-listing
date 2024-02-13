<template>
  <ProductsLayout :breadcrumbs="breadcrumbs" :title="route.params.category">
  </ProductsLayout>
</template>
    
<script setup lang="ts">
import ProductsLayout from '@/layouts/ProductsLayout.vue';
const route = useRoute();
const categoryStore = useCategoryStore();
const slug = route.params.category;
const breadcrumbs = categoryStore.mainCategories.filter(category => category.slug === slug)[0].breadcrumbs;
</script>