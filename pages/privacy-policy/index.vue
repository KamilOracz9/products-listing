<template>
    <div class="pb-10">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
        <p class="section-title">{{ title }}</p>
        <div v-html="description.content.html"></div>
    </div>
</template>

<script setup lang="ts">
import { fetchPrivacyPolicyPage } from '~/services/api';
import type { PrivacyPolicyPage } from '~/types/privacy-policy.types';

const { data } = await useAsyncData('privacy-policy', () => fetchPrivacyPolicyPage());
const { breadcrumbs, title, description, meta } = toRefs(data.value as PrivacyPolicyPage);

setMeta(meta.value);
</script>