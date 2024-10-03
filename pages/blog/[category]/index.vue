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
import { DataKeys } from '~/enums/dataKeys';
import { fetchInspirationCategoryPage } from '~/services/api';
import type { InspirationCategoryPage } from '~/types/inspirations.types';

const route = useRoute();
const localeRoute = useLocaleRoute();
const {locale} = useI18n();

const { data } = await useAsyncData(DataKeys.INSPIRATIONS_CATEGORY_PAGE, async () => fetchInspirationCategoryPage(route.params.category as string));
const { breadcrumbs, items, title, slug } = toRefs(data.value as InspirationCategoryPage);
const linkPath = computed(() => {
    const route = localeRoute('blog', locale.value)
    return route != null ? route.path : '/'
})

onMounted(() => {
    window.history.replaceState({}, '', linkPath.value + `/${slug.value}/`);
})
</script>