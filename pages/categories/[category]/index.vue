<template>
  <NuxtLayout name="products" :breadcrumbs="breadcrumbs" :title="route.params.category">
  </NuxtLayout>
</template>
    
<script setup lang="ts">
const route = useRoute();
const categoryStore = useCategoryStore();
const slug = route.params.category;
const breadcrumbs = categoryStore.mainCategories.filter(category => category.slug === slug)[0].breadcrumbs;
</script>