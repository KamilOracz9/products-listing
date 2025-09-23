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
                    <tr>
                        <th class="border-b-[2px] border-gray-1 w-[25px]"></th>
                        <th class="text-lg font-medium px-8 pb-4 border-b-[2px] border-gray-1 w-full"
                            v-for="header in headers">
                            <img height="20" class="min-h-[20px] min-w-[30px] max-w-[30px] mx-auto"
                                v-if="headerIcons[header]" :src="headerIcons[header]" alt="">
                            <span v-else>{{ $t(`product.${header}`) }}</span>
                        </th>
                        <th class="w-[60px]"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="variant in ungroupedVariants">
                        <tr class="text-sm even:bg-gray-2 cursor-pointer">
                            <td class="pl-2 w-[25px]"><span
                                    :class="[`${variant.order_time_id && getRealizationColor(variant.order_time_id)}`]"
                                    class="flex size-2 -translate-y-[10%]"></span></td>
                            <td v-for="header in headers" class="break-keep whitespace-nowrap"
                                @click="openPdfInNewTab($event, variant.id)"
                                :data-href="`${useAppConfig().public.base}/api/v1/products/${productId}/variants/${variant.id}/export-to-pdf?locale=${localeIso}`"
                                :class="['symbol'].includes(header) ? 'pl-4' : 'text-center'">{{
                                    $t(`product.${getHeader(variant, header)}`, getHeader(variant, header)) }}</td>
                            <td
                                class="w-[60px] justify-center whitespace-nowrap font-medium bg-white flex gap-4 py-1.5">
                                <SectionsCommonToggleClipboard :id="variant.id" :symbol="variant.symbol" />
                                <SectionsCommonGenerateProductCard :productId="productId" :variantId="variant.id" />
                            </td>
                        </tr>
                    </template>

                    <template v-for="group in groupedVariants">
                        <tr class="text-sm even:bg-gray-2">
                            <td class="w-full pl-10" :colspan="headers.length + 1">{{ group[0] }}</td>
                        </tr>

                        <tr v-for="variant in group[1]" class="text-sm even:bg-gray-2">
                            <td class="pl-2 w-[25px]"><span
                                    :class="[`${variant.order_time_id && getRealizationColor(variant.order_time_id)}`]"
                                    class="flex size-2 -translate-y-[10%]"></span></td>
                            <td v-for="header in headers" class="break-keep whitespace-nowrap"
                                :class="['symbol'].includes(header) ? 'pl-4' : 'text-center'">{{ getHeader(variant,
                                    header) }}</td>
                            <td
                                class="w-[60px] justify-center whitespace-nowrap font-medium bg-white flex gap-4 py-1.5">
                                <SectionsCommonToggleClipboard :id="variant.id" :symbol="variant.symbol" />
                                <!-- <SectionsCommonGenerateProductCard :productId="productId" :variantId="variant.id" /> -->
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="flex flex-col lg:flex-row gap-10">
                <div v-if="ungroupedVariants.find(({ order_time_id }) => order_time_id !== 1)"
                    class="flex flex-col gap-4 mt-10">
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
                    <div class="flex items-center gap-2">
                        <img class="size-[16px]" src="/assets/icons/product_card.svg" alt="">
                        <p class="text-sm">{{ $t('product.generate-product-card') }}</p>
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
import symbolIcon from 'assets/icons/symbol_icon.svg';
import dimensionsIcon from 'assets/icons/dimensions_icon.svg';
import colorIcon from 'assets/icons/color_icon.svg';
import doorsIcon from 'assets/icons/doors_icon.svg';
import materialIcon from 'assets/icons/material_icon.svg';
import { groupBy } from '~/utils';
import { map } from 'leaflet';

const props = defineProps<{
    techImages: IPhoto[];
    variants: Variant[];
    productId: number;
}>();

const headerIcons: Ref<{
    [key: string]: string;
}> = ref({
    'symbol': symbolIcon,
    'dimensions': dimensionsIcon,
    'color': colorIcon,
    'product_direction': doorsIcon,
    'material': materialIcon,
});

const { techImages, variants } = toRefs(props);
const ungroupedVariants = computed(() => variants.value.filter(variant => !variant.group));
const groupedVariants = computed(() => [...groupBy(variants.value.filter(variant => variant.group), variant => variant.group.name)].map(([groupName, groupVariants]) => [groupName, groupVariants.sort((a, b) => {
    const aDim = parseFloat(a.dimensions as string) || 0;
    const bDim = parseFloat(b.dimensions as string) || 0;
    return aDim - bDim;
})]));

const localeIso = ref(getLocaleIso());
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);
const headers: Ref<{
    [key: string]: any;
}> = computed(() => (
    [
        ...new Set(
            variants.value.map(variant => {
                return Object.keys(variant).map(key => {
                    if (variant[key]) return key;
                }).filter(key => key)
            }).flat()
        )
    ].filter(header => !['id', 'width', 'height', 'length', 'order_time_id', 'group'].includes(header as string))
))

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const getHeader = (variant: Variant, header: string) => {
    if (header && header.startsWith('dimension_') && variant[header] && variant[header].startsWith('0-')) return `max ${variant[header].split('-')[1]}`;

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

const openPdfInNewTab = (event: Event, variantId: number) => {
    const target = event.currentTarget as HTMLElement;
    const url = target.getAttribute('data-href');
    if (url) {
        window.open(url, '_blank');
    }
};
</script>

<style>
.table-wrapper {
    container-type: inline-size;
}

@container(min-width: 1280px) {
    table {
        table-layout: fixed;
    }
}
</style>