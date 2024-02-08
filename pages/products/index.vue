<template>
  <section>
    <NuxtLayout name="products" v-if="categoryStore.breadcrumbs" :title="$t('products')" :breadcrumbs="categoryStore.breadcrumbs">
    </NuxtLayout>
  </section>
</template>
  
<script setup lang="ts">

const categoryStore = useCategoryStore();
</script>