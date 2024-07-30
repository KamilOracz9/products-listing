<template>
    <div class="pb-10" id="privacy-policy">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
        <div class="[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 leading-6 break-all sm:break-normal" v-html="description.content.html"></div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchPrivacyPolicyPage } from '~/services/api';
import type { PrivacyPolicyPage } from '~/types/privacy-policy.types';

const { data } = await useAsyncData(DataKeys.PRIVACY_POLICY_PAGE, async () => fetchPrivacyPolicyPage());
const { breadcrumbs, title, description, meta } = toRefs(data.value as PrivacyPolicyPage);

setMeta(meta.value);
</script>

<style>
#privacy-policy h1 {
    font-size: 2.25rem;
    margin-bottom: 5rem;
}

#privacy-policy h2 {
    font-size: 1.625rem;
    margin-bottom: .5rem;
}

#privacy-policy h3 {
    font-size: 1.375rem;
    line-height: 120%;
    margin-bottom: .5rem;
}

#privacy-policy p {
    font-size: 1rem;
    line-height: 120%;
    margin-bottom: 1.5rem;
}
</style>