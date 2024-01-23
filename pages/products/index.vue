<template>
  <div>
    {{ $t('products') }}
  </div>
</template>
  
<script setup lang="ts">
defineI18nRoute({
  paths: {
    "en": "/products",
    "pl": "/produkty"
  }
})
</script>