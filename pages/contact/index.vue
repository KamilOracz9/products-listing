<template>
    <div>
      {{ $t('contact') }}
    </div>
</template>
  
<script setup lang="ts">
import paths from '@/lang/paths/contact.json'

defineI18nRoute({ paths })
</script>