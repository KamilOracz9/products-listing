<template>
  <div v-if="!forProfessionalStore.isLoading">
    <SectionsCommonBreadrumbs :breadcrumbs="forProfessionalStore.breadcrumbs" />
    <SectionsForProfessionalsPartnerZone />
    <SectionsForProfessionalsArchitectZone />
  </div>
</template>
  
<script setup lang="ts">
const forProfessionalStore = useForProfessionalStore();

provide('forProfessionalStore', forProfessionalStore);

onMounted(async () => {
  await forProfessionalStore.fetchData();
})
</script>