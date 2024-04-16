<template>
  <div class="mb-10">
    <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
    <SectionsContactMain :data="description.content.contact" :title="title" />
    <SectionsContactTiles :data="description.content.departments" />
    <SectionsContactSaleServiceDepartment :data="description.content.sales" />
    <SectionsContactExportDepartment :data="description.content.export" />
    <MapsLocalizationOnly />
  </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchContactPage } from '~/services/api';
import type { ContactPage } from '~/types/contact.types';

const { data } = await useAsyncData(DataKeys.CONTACT_PAGE, () => fetchContactPage());
const { breadcrumbs, description, meta, title } = toRefs(data.value as ContactPage);

setMeta(meta.value);
</script>