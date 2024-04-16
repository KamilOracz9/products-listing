<template>
    <div class="pb-10">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
        <div class="[&_ul]:list-disc pl-8 leading-6" v-html="description.content.html"></div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchInformationClausuePage } from '~/services/api';
import type { InformationClausuePage } from '~/types/information-clausue.types';

const { data } = await useAsyncData(DataKeys.INFORMATION_CLAUSUE_PAGE, () => fetchInformationClausuePage());
const { breadcrumbs, meta, description } = toRefs(data.value as InformationClausuePage);

setMeta(meta.value);
</script>