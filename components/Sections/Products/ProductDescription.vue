<template>
    <SectionsCommonAccordion :label="$t('product.product-description')" id="product-description">
        <div v-html="description"></div>
        <div v-if="colors.length" class="my-3">
            <p class="font-medium">{{ $t('product.desc-colors') }}</p>
            <ul class="flex flex-wrap">
                <li v-for="color in colors" class="relative color">
                    <Tooltip :text="color.label" />
                    <NuxtLink :to="localePath({ name: 'products' }) + `/${color.slug}/`" :aria-label="color.label">
                        <img class="w-[70px] aspect-[1/1]" :src="color.image.mobile" alt="">
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div v-if="attributes.length">
            <ul class="flex gap-2 flex-wrap mt-4">
                <li v-for="attribute in attributes"
                    class="w-1/4 relative attribute cursor-pointer sm:w-[calc(100%/7)] xl:w-auto xl:max-w-[74px]">
                    <SectionsCommonTooltip :text="attribute.label" />
                    <picture>
                        <img class="aspect-[1/1] w-full" :src="attribute.image.mobile" alt="">
                    </picture>
                </li>
            </ul>
        </div>
        <div class="my-3" v-if="doorsOpen.length">
            <p class="font-medium">{{ $t('product.desc-doors') }}</p>
            <ul class="flex flex-wrap gap-2">
                <li v-for="(item, index) in doorsOpen" class="w-1/2 max-w-[126px] cursor-pointer"
                    @click="openModal(index)">
                    <img :src="item.thumbnail" alt="">
                </li>
            </ul>
        </div>

        <iframe v-if="video" class="w-full aspect-video my-5" :src="video" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        <LazySectionsCommonLightbox :images="doorsOpen" />
    </SectionsCommonAccordion>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';
import Tooltip from '../Common/Tooltip.vue';

const localePath = useLocalePath();

const props = defineProps<{
    description: string;
    doorsOpen: IPhoto[];
    attributes: {
        image: IPhoto;
        label: string;
    }[];
    colors: {
        image: IPhoto;
        label: string;
        slug: string;
    }[],
    video?: string;
}>();

const { description, doorsOpen, attributes, colors, video } = toRefs(props);

const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const openModal = (index: number) => {
    modalIsOpen.value = true;
    galleryActiveSlide.value = index;
}
</script>

<style>
.attribute:hover>.tooltip, .color:hover>.tooltip {
    opacity: 1;
}
</style>