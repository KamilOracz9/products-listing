<template>
    <div class="pb-10">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
        <p class="section-title">{{ title }}</p>
        <div v-html="description.html"></div>
    </div>
</template>

<script setup lang="ts">
import { fetchPrivacyPolicy } from '~/services/api';
import { setMeta } from '~/utils';

const { data } = await useAsyncData('privacy-policy', () => fetchPrivacyPolicy());
const { breadcrumbs, title, description, meta } = toRefs(data.value);

setMeta(meta);
</script>