<template>
    <div>
      {{ $t('about') }}
    </div>
</template>
  
<script setup lang="ts">
import paths from '@/lang/paths/contact.json'

defineI18nRoute({ paths })
</script>