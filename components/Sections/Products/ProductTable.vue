<template>
    <SectionsCommonAccordion :label="$t('product.product-table')" id="product-table">
        <div>
            <ul class="flex gap-2 overflow-x-auto pb-3 mb-10">
                <li v-for="(techImage, index) in techImages" class="min-w-[128px] lg:w-[300px] cursor-pointer"
                    @click="openModal(index)">
                    <picture>
                        <source media="(min-width: 1024px)" :srcset="techImage.desktop">
                        <img class="w-full" :src="techImage.mobile" alt="">
                    </picture>
                </li>
            </ul>
        </div>

        <div class="table-wrapper overflow-x-auto pb-3 w-full">
            <table class="w-full">
                <thead>
                    <th class="border-b-[2px] border-gray-1 w-[25px]"></th>
                    <th class="text-lg font-medium px-8 pb-4 border-b-[2px] border-gray-1 w-full"
                        v-for="header in headers">
                        <img height="20" class="min-h-[20px] min-w-[30px] max-w-[30px] mx-auto"
                            v-if="headerIcons[header]" :src="headerIcons[header]" alt="">
                        <span v-else>{{ $t(`product.${header}`) }}</span>
                    </th>
                    <th class="w-[30px]"></th>
                </thead>
                <tbody>
                    <tr v-for="variant in variants" class="text-sm even:bg-gray-2">
                        <td class="pl-2 w-[25px]"><span
                                :class="[`${variant.order_time_id && getRealizationColor(variant.order_time_id)}`]"
                                class="flex size-2 -translate-y-[10%]"></span></td>
                        <td v-for="header in headers" class="text-center" :class="`w-full`">{{ getHeader(variant,
                            header) }}</td>
                        <td class="w-[30px] justify-center whitespace-nowrap font-medium bg-white flex gap-4 py-1.5">
                            <button @click="clipboardStore.toggleItem(variant.id)"
                                :aria-label="`${$t('pages.product.toggle-clipboard')}: ${variant?.symbol}`"><img
                                    class="min-w-4 min-h-4" src="/assets/icons/clipboard.svg" alt=""></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex flex-col lg:flex-row gap-10">
                <div class="flex flex-col gap-4 mt-10">
                    <div class="flex items-center gap-2">
                        <span :class="[`${getRealizationColor(2)}`]" class="flex size-2 -translate-y-[10%]"></span>
                        <p class="text-sm">{{ $t('product.realization-time.2-weeks') }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span :class="[`${getRealizationColor(3)}`]" class="flex size-2 -translate-y-[10%]"></span>
                        <p class="text-sm">{{ $t('product.realization-time.4-weeks') }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span :class="[`${getRealizationColor(5)}`]" class="flex size-2 -translate-y-[10%]"></span>
                        <p class="text-sm">{{ $t('product.realization-time.6-weeks') }}</p>
                    </div>
                </div>
                <div class="flex flex-col gap-4 mt-10">
                    <div class="flex items-center gap-2">
                        <img class="size-[16px]" src="/assets/icons/clipboard.svg" alt="">
                        <p class="text-sm">{{ $t('product.add-to-clipboard') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <LazySectionsCommonLightbox :images="techImages" />

        <iframe v-if="video" class="w-full aspect-video" src="https://www.youtube.com/embed/wBSekO2OvEE?si=xPTMZcaUiAa9LGDP"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </SectionsCommonAccordion>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';
import type { Variant } from '~/types/products.types';
import symbolIcon from 'assets/icons/symbol_icon.svg';
import dimensionsIcon from 'assets/icons/dimensions_icon.svg';
import colorIcon from 'assets/icons/color_icon.svg';
import doorsIcon from 'assets/icons/doors_icon.svg';
import materialIcon from 'assets/icons/material_icon.svg';

const props = defineProps<{
    techImages: IPhoto[];
    variants: Variant[];
    video?: string;
}>();

const headerIcons = ref({
    'symbol': symbolIcon,
    'dimensions': dimensionsIcon,
    'color': colorIcon,
    'doors': doorsIcon,
    'material': materialIcon,
});

const { techImages, variants, video } = toRefs(props);

const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);
const headers = computed(() => Object.keys(Object.fromEntries(Object.entries(variants.value[0]).filter(([key, value]) => value && !['id', 'width', 'height', 'length', 'order_time_id'].includes(key)))));
const clipboardStore = useClipboardStore();

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const getHeader = (variant: Variant, header: string) => {
    return variant[header];
}

const openModal = (index: number) => {
    modalIsOpen.value = true;
    galleryActiveSlide.value = index;
}

const getRealizationColor = (realizationTime: number) => {
    switch (realizationTime) {
        case 2: return 'bg-[#41f841]';
        case 3: return 'bg-[#fa3939]';
        case 5: return 'bg-[#f0e332]';
        default: return '';
    }
}
</script>

<style>
.table-wrapper {
    container-type: inline-size;
}

@container(min-width: 768px) {
    table {
        table-layout: fixed;
    }
}
</style>