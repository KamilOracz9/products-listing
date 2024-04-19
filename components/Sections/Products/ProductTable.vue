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

        <div class="overflow-x-auto pb-3">
            <table class="w-full">
                <thead>
                    <th class="border-b-[2px] border-gray-1"></th>
                    <th class="text-lg font-medium px-8 pb-4 border-b-[2px] border-gray-1"
                        v-for="header in Object.keys(Object.fromEntries(Object.entries(variants[0]).filter(([key, value]) => value && key !== 'id')))">
                        {{
                            $t(`product.${header}`) }}</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="variant in variants" class="text-sm even:bg-gray-2">
                        <td class="pl-2"><span :class="[`${getRealizationColor(variant?.realizationTime)}`]"
                                class="flex size-2 -translate-y-[10%]"></span></td>
                        <td v-if="variant?.symbol" class="pl-8 py-1">{{ variant?.symbol }}</td>
                        <td v-if="variant?.dimensions" class="pl-8 py-1">{{ variant?.dimensions }}</td>
                        <td v-if="variant?.doors" class="text-center">{{ variant?.doors?.number }}{{
                            variant?.doors?.direction }}</td>
                        <td v-if="variant?.dimension_a" class="text-center">{{ variant?.dimension_a }}</td>
                        <td v-if="variant?.dimension_b" class="text-center">{{ variant?.dimension_b }}</td>
                        <td v-if="variant?.dimension_c" class="text-center">{{ variant?.dimension_c }}</td>
                        <td v-if="variant?.dimension_d" class="text-center">{{ variant?.dimension_d }}</td>
                        <td v-if="variant?.dimension_e" class="text-center">{{ variant?.dimension_e }}</td>
                        <td v-if="variant?.dimension_f" class="text-center">{{ variant?.dimension_f }}</td>
                        <td v-if="variant?.dimension_w" class="text-center">{{ variant?.dimension_w }}</td>
                        <td v-if="variant?.height" class="text-center">{{ variant?.height }}</td>
                        <td v-if="variant?.width" class="text-center">{{ variant?.width }}</td>
                        <td v-if="variant?.dimension_axis_x1" class="text-center">{{ variant?.dimension_axis_x1 }}</td>
                        <td v-if="variant?.dimension_axis_x2" class="text-center">{{ variant?.dimension_axis_x2 }}</td>
                        <td class="w-full whitespace-nowrap pl-5 font-medium bg-white flex gap-4 py-1.5">
                            <button class="size-4"><img src="/assets/icons/clipboard.svg" alt=""></button>
                            <NuxtLink class="flex gap-2 items-center size-4"
                                :to="localePath({ name: 'place-to-buy' }) + `?symbol=${variant?.symbol}`"><img
                                    class="size-[16px]" src="@/assets/icons/map-pin.svg" alt=""></NuxtLink>
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
                        <span :class="[`${getRealizationColor(4)}`]" class="flex size-2 -translate-y-[10%]"></span>
                        <p class="text-sm">{{ $t('product.realization-time.4-weeks') }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span :class="[`${getRealizationColor(6)}`]" class="flex size-2 -translate-y-[10%]"></span>
                        <p class="text-sm">{{ $t('product.realization-time.6-weeks') }}</p>
                    </div>
                </div>
                <div class="flex flex-col gap-4 mt-10">
                    <div class="flex items-center gap-2">
                        <img src="/assets/icons/clipboard.svg" alt="">
                        <p class="text-sm">{{ $t('product.add-to-clipboard') }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img class="size-[16px]" src="@/assets/icons/map-pin.svg" alt="">
                        <p class="text-sm">{{ $t('product.search-in-expositions') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <LazySectionsCommonLightbox :images="techImages" />
    </SectionsCommonAccordion>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';
import type { Variant } from '~/types/products.types';

const props = defineProps<{
    techImages: IPhoto[];
    variants: Variant[];
}>();

const { techImages } = toRefs(props);

const localePath = useLocalePath();

const headers = ['symbol', 'dimensions', 'doors', 'a', 'b', 'c', 'h', 'w', 'x1', 'x2'];
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const openModal = (index: number) => {
    modalIsOpen.value = true;
    galleryActiveSlide.value = index;
}

const getRealizationColor = (realizationTime: number) => {
    switch (realizationTime) {
        case 2: return 'bg-[#41f841]';
        case 4: return 'bg-[#fa3939]';
        case 6: return 'bg-[#f0e332]';
        default: return '';
    }
}
</script>