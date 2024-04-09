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
import { fetchContact } from '~/services/api';
import type { ContactPage } from '~/types/contact.types';
import { setMeta } from '~/utils';

const { data } = await useAsyncData('contact', () => fetchContact());
const { breadcrumbs, description, meta, title } = toRefs(data.value as ContactPage);

setMeta(meta.value);
</script>