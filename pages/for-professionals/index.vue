<template>
    <div>
      {{ $t('inspirations') }}
    </div>
</template>
  
<script setup lang="ts">
import paths from '@/lang/paths/for-professionals.json'

defineI18nRoute({ paths })
</script>