<template>
  <ProductsLayout :breadcrumbs="[]" :title="route.params.category" :shortText="categoryStore.shortText" :longText="categoryStore.longText">
  </ProductsLayout>
</template>
    
<script setup lang="ts">
import ProductsLayout from '@/layouts/ProductsLayout.vue';
const route = useRoute();
const categoryStore = useCategoryStore();
const slug = route.params.category;
// const breadcrumbs = categoryStore.mainCategories.filter(category => category.slug === slug)[0].breadcrumbs;
// console.log(categoryStore.mainCategories, slug)
</script>