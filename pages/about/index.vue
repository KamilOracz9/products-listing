<template>
  <div>
    {{ $t('about') }}
  </div>
</template>
  
<script setup lang="ts">
defineI18nRoute({
  paths: {
    "en": "/about",
    "pl": "/o-firmie"
  }
})
</script>