<template>
  <div class="mb-10">
    <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
    <SectionsContactMain :data="description.content.contact" :title="title" />
    <SectionsContactTiles :data="description.content.departments" />
    <SectionsContactSaleServiceDepartment :data="description.content.sales" v-if="locale === 'pl'" />
    <SectionsContactExportDepartment :data="description.content.export" />
    <ClientOnly>
      <MapsLocalizationOnly />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchContactPage } from '~/services/api';
import type { ContactPage } from '~/types/contact.types';

const { locale } = useI18n();
const { $locale } = useNuxtApp();

const { data } = await useAsyncData(DataKeys.CONTACT_PAGE, async () => fetchContactPage($locale));
const { breadcrumbs, description, meta, title, schema } = toRefs(data.value as ContactPage);

setMeta(meta.value);

useSchemaOrg([
  schema.value
])
</script>