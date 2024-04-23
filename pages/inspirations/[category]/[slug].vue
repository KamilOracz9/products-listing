<template>
    <Suspense>
        <div>
            <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

            <div class="pb-10">
                <h1 class="uppercase text-[2rem] leading-[2.25rem] mb-10">{{ title }}</h1>
            </div>
            <div class="mb-20 xl:flex xl:gap-10">
                <div class="pb-10 border-b border-gray-1 mb-10 xl:w-3/4 xl:border-b-0">
                    <div class="w-full">
                        <picture>
                            <source media="(min-width: 768px)" :srcset="image.desktop">
                            <source media="(min-width: 450px)" :srcset="image.tablet">
                            <img :src="image.mobile" alt="" class="w-full">
                        </picture>
                    </div>

                    <div v-html="description" class="text-sm [&>p]:mb-4 mt-6 sm:text-base sm:my-10">
                    </div>

                    <ul class="flex flex-col gap-4 md:gap-10 md:flex-row">
                        <li v-for="(image, index) in gallery" :key="index" class="flex-1 cursor-pointer"
                            @click="modalIsOpen = true">
                            <picture>
                                <source media="(min-width: 768px)" :srcset="image.desktop">
                                <source media="(min-width: 450px)" :srcset="image.tablet">
                                <img :src="image.mobile" alt="" class="w-full aspect-[1/1]">
                            </picture>
                        </li>
                    </ul>
                </div>
                <div class="xl:w-1/4">
                    <SectionsInspirationsArticles :articles="related" listClass="xl:grid-cols-1" />
                </div>
            </div>

            <LazySectionsCommonLightbox :images="gallery" />
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
import fetchData, { fetchInspirationPage } from '~/services/api';
import type { InspirationPage } from '~/types/inspirations.types';

const route = useRoute();
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const { data } = await fetchData(DataKeys.INSPIRATION_PAGE, () => fetchInspirationPage(route.params.slug as string));
const { breadcrumbs, title, related, image, gallery, description } = toRefs(data.value as InspirationPage);

setMeta({
    meta_title: title.value,
    meta_keywords: title.value,
    meta_description: title.value,
});
</script>