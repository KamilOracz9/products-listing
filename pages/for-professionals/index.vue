<template>
  <div>
    {{ $t('inspirations') }}
  </div>
</template>
  
<script setup lang="ts">
defineI18nRoute({
  paths: {
    "en": "/for-professionals",
    "pl": "/dla-profesjonalistow"
  }
})
</script>