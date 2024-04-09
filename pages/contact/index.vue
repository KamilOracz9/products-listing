<template>
  <div class="mb-10">
    <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
    <SectionsContactMain :data="description.content.contact" :title="title" />
    <SectionsContactTiles :data="description.content.departments" />
    <SectionsContactSaleServiceDepartment :data="description.content.sales" />
    <SectionsContactExportDepartment :data="description.content.export" />
    <MapsLocalizationOnly />
    <!-- <SectionsCommonBreadrumbs :breadcrumbs="contactStore.breadcrumbs" />
    <SectionsContactMain />
    <SectionsContactTiles />
    <SectionsContactSaleServiceDepartment />
    <SectionsContactExportDepartment />
    <MapsLocalizationOnly /> -->
  </div>
</template>

<script setup lang="ts">
import { fetchContact } from '~/services/api';
import type { ContactPage } from '~/types/contact.types';

// const contactStore = useContactStore();
// provide('contactStore', contactStore);

// onMounted(async () => {
//   await contactStore.fetchData();
// })

const { data } = await useAsyncData('contact', () => fetchContact());
const { breadcrumbs, description, meta, title } = toRefs(data.value as ContactPage);

setMeta(meta.value);
</script>