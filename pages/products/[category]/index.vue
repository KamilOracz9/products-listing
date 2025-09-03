<template>
  <section>
    <ProductsLayout :breadcrumbs="[]" :title="route.params.category">
    </ProductsLayout>
  </section>
</template>

<script setup lang="ts">
import ProductsLayout from '~/layouts/ProductsLayout.vue';
const route = useRoute();
</script>