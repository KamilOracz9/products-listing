<template>
  <div>
    <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
    <SectionsForProfessionalsPartnerZone :data="description.content.partner_zone" />
    <SectionsForProfessionalsArchitectZone :data="description.content.architect_zone" />
  </div>
</template>

<script setup lang="ts">
import { fetchForProfessionalsPage } from '~/services/api';
import type { ForProfessionalsPage } from '~/types/for-professionals.types';

const { data } = await useAsyncData('for-professionals', () => fetchForProfessionalsPage());
const { meta, breadcrumbs, description } = toRefs(data.value as ForProfessionalsPage);

setMeta(meta.value);
</script>