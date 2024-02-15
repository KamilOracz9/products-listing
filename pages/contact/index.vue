<template>
  <div v-if="!contactStore.isLoading" class="mb-10">
    <SectionsCommonBreadrumbs :breadcrumbs="contactStore.breadcrumbs" />
    <SectionsContactMain />
    <SectionsContactTiles />
    <SectionsContactSaleServiceDepartment />
    <SectionsContactExportDepartment />
    <MapsLocalizationOnly />
  </div>
</template>
  
<script setup lang="ts">
import useSlideTo from '~/plugins/useSlideTo';

const contactStore = useContactStore();
provide('contactStore', contactStore);

onMounted(async () => {
  await contactStore.fetchData();

  useSlideTo();
})
</script>