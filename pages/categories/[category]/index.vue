<template>
  <ProductsLayout :breadcrumbs="[]" :title="route.params.category">
  </ProductsLayout>
</template>
    
<script setup lang="ts">
import ProductsLayout from '@/layouts/ProductsLayout.vue';
const route = useRoute();
</script>