<template>
    <Suspense>
        <div class="mb-20">
            <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

            <div class="pb-10">
                <h1 class="section-title">{{ title }}</h1>
            </div>
            <SectionsInspirationsArticles :articles="items" />
        </div>

        <template #fallback>
            <div class="h-[70svh]">
                <Loading />
            </div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { fetchInspirationCategoryPage } from '~/services/api';
import type { InspirationCategoryPage } from '~/types/inspirations.types';

const route = useRoute();

const { data } = await useAsyncData('inspiration-category', () => fetchInspirationCategoryPage(route.params.category as string));
const { breadcrumbs, items, pagination, title } = toRefs(data.value as InspirationCategoryPage);
</script>