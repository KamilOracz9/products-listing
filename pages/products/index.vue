<template>
  <div>
    {{ $t('products') }}
  </div>
</template>
  
<script setup lang="ts">
import paths from '@/lang/paths/products.json'

defineI18nRoute({ paths })
</script>