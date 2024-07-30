<template>
    <div class="pb-10" id="information-clausue">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
        <div class="[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 leading-6 break-all sm:break-normal" v-html="description.content.html"></div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchInformationClausuePage } from '~/services/api';
import type { InformationClausuePage } from '~/types/information-clausue.types';

const { data } = await useAsyncData(DataKeys.INFORMATION_CLAUSUE_PAGE, async () => fetchInformationClausuePage());
const { breadcrumbs, meta, description } = toRefs(data.value as InformationClausuePage);

setMeta(meta.value);
</script>

<style>
#information-clausue h1 {
    font-size: 2.25rem;
    margin-bottom: 5rem;
}

#information-clausue h2 {
    font-size: 1.625rem;
    margin-bottom: .5rem;
}

#information-clausue h3 {
    font-size: 1.375rem;
    line-height: 120%;
    margin-bottom: .5rem;
}

#information-clausue p {
    font-size: 1rem;
    line-height: 120%;
    margin-bottom: 1.5rem;
}
</style>