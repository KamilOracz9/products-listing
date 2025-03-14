<template>
    <div class="mb-20">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

        <div class="pb-10">
            <h1 class="section-title">{{ title }}</h1>
        </div>
        <SectionsInspirationsArticles :articles="items" />
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchInspirationCategoryPage } from '~/services/api';
import type { InspirationCategoryPage } from '~/types/inspirations.types';

const route = useRoute();
const localeRoute = useLocaleRoute();
const { locale } = useI18n();
const { $locale } = useNuxtApp();

const { data } = await useAsyncData(DataKeys.INSPIRATIONS_CATEGORY_PAGE, async () => fetchInspirationCategoryPage(route.params.category as string, $locale));
const { breadcrumbs, items, title, slug, meta } = toRefs(data.value as InspirationCategoryPage);
const linkPath = computed(() => {
    const route = localeRoute('blog', locale.value)
    return route != null ? route.path : '/'
})

setMeta(meta.value);

// onMounted(() => {
//     window.history.replaceState({}, '', linkPath.value + `/${slug.value}/`);
// })
</script>