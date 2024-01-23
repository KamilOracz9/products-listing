<template>
  <div>
    {{ $t('contact') }}
  </div>
</template>
  
<script setup lang="ts">
defineI18nRoute({
  paths: {
    "en": "/contact",
    "pl": "/kontakt"
  }
})
</script>