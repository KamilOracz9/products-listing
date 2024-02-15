<template>
  <div v-if="!forProfessionalStore.isLoading">
    <SectionsCommonBreadrumbs :breadcrumbs="forProfessionalStore.breadcrumbs" />
    <SectionsForProfessionalsPartnerZone />
    <SectionsForProfessionalsArchitectZone />
  </div>
</template>
  
<script setup lang="ts">
import useSlideTo from '@/plugins/useSlideTo';

const forProfessionalStore = useForProfessionalStore();

provide('forProfessionalStore', forProfessionalStore);

onMounted(async () => {
  await forProfessionalStore.fetchData();

  useSlideTo();
})
</script>