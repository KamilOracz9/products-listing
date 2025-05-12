<template>
  <div>
    <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
    <SectionsForProfessionalsPartnerZone :data="description.content.partner_zone" />
    <SectionsForProfessionalsArchitectZone :data="description.content.architect_zone" />
  </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchForProfessionalsPage } from '~/services/api';
import type { ForProfessionalsPage } from '~/types/for-professionals.types';

const { data } = await useAsyncData(DataKeys.FOR_PROFESSIONALS_PAGE, async () => fetchForProfessionalsPage(getLocaleIso()));
const { meta, breadcrumbs, description, schema } = toRefs(data.value as ForProfessionalsPage);

setMeta(meta.value);

useSchemaOrg([
  schema.value
])
</script>