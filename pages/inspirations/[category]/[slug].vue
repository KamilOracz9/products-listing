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

                    <div v-html="description" class="article-content mt-10"></div>
                    <!-- <div v-html="description" class="text-sm [&>p]:mb-4 mt-6 sm:text-base sm:my-10"></div> -->

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

const localePath = useLocalePath();
const route = useRoute();
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const { data } = await fetchData(DataKeys.INSPIRATION_PAGE, async () => fetchInspirationPage(route.params.slug as string));
const { breadcrumbs, title, related, image, gallery, description } = toRefs(data.value as InspirationPage);

setMeta({
    meta_title: title.value,
    meta_keywords: title.value,
    meta_description: title.value,
});

onMounted(() => {
    window.history.replaceState({}, '', localePath([...toValue(breadcrumbs)].reverse()[0].path) + '/');
})
</script>

<style lang="css">
.article-content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.article-content p,
.article-content a,
.article-content li {
    font-size: 1.25rem;
    line-height: 125%;
}

.article-content h2 {
    font-weight: 500;
    font-size: 2rem;
}


.article-content h3 {
    font-weight: 400;
    font-size: 1.875rem;
    line-height: 125%;
}

.article-content div {
    display: flex;
    flex-direction: column;
}

.article-content img {
    width: 100%;
}

.article-content ul {
    list-style: disc;
    padding-left: 1.25rem;
}

.article-content ol {
    list-style: decimal;
    padding-left: 1.25rem;
}

.article-content a:not(.img-url) {
    font-size: 1.375rem;
    border: 1px solid #1d1d1b;
    position: relative;
    padding: 0.875rem 0.875rem 0.7rem;
    display: flex;
    margin-top: auto;
    width: max-content;
    line-height: 125%;
    padding-right: 2.5rem;
    text-transform: uppercase;
}

.article-content a:not(.img-url):hover {
    background-color: #1d1d1b;
    color: white;
    transition: all;
    transition-duration: .3s;
}

.article-content a:not(.img-url):hover::after {
    filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(25deg) brightness(103%) contrast(103%);
    transition: all;
    transition-duration: .3s;
}

.article-content a:not(.img-url)::after {
    content: '';
    width: 1.375rem;
    height: 1.625rem;
    z-index: 10;
    right: 0;
    top: 50%;
    translate: 0 -65%;
    position: absolute;
    background-image: url('/_nuxt/assets/icons/arrow.svg');
    rotate: -90deg;
    background-repeat: no-repeat;
}

.article-content .layout-custom-1,
.article-content .layout-custom-2,
.article-content .layout-regular-1,
.article-content .layout-regular-2,
.article-content .layout-regular-3,
.article-content .layout-regular-4,
.article-content .layout-regular-5 {
    display: grid;
    gap: 2.5rem;
}

.article-content .layout-regular-5>div:nth-child(1) {
    grid-area: col-1;
}

.article-content .layout-regular-5>div:nth-child(2) {
    grid-area: col-2;
}

.article-content .layout-regular-5>div:nth-child(3) {
    grid-area: col-3;
}

.article-content .layout-regular-5>div:nth-child(4) {
    grid-area: col-4;
}

.article-content .layout-regular-5>div:nth-child(5) {
    grid-area: col-5;
}

.article-content .layout-custom-1 img,
.article-content .layout-custom-2 img {
    width: 200px;
}

@media(min-width: 768px) {
    .article-content .layout-custom-1 {
        grid-template-columns: 1fr 2fr;
    }

    .article-content .layout-custom-2 {
        grid-template-columns: 2fr 1fr;
    }

    .article-content .layout-regular-2 {
        grid-template-columns: repeat(2, 1fr);
    }

    .article-content .layout-regular-3 {
        grid-template-columns: repeat(3, 1fr);
    }

    .article-content .layout-regular-4 {
        grid-template-columns: repeat(2, 1fr);
    }

    .article-content .layout-regular-5 {
        grid-template-areas: "col-1 col-2" "col-3 col-4" "col-5 col-5";
    }
}

@media(min-width: 1024px) {
    .article-content .layout-regular-4 {
        grid-template-columns: repeat(4, 1fr);
    }

    .article-content .layout-regular-5 {
        grid-template-areas: "col-1 col-1 col-2 col-2 col-3 col-3" "col-4 col-4 col-4 col-5 col-5 col-5";
    }
}

@media(min-width: 1536px) {
    .article-content .layout-regular-5 {
        grid-template-areas: "col-1 col-2 col-3 col-4 col-5";
    }
}
</style>