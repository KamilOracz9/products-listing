<template>
    <SectionsCommonAccordion :label="$t('product.product-table')" id="product-table">
        <div>
            <ul class="flex gap-2 overflow-x-auto pb-3 mb-10">
                <li v-for="(techImage, index) in productStore.product.item.images.tech" class="min-w-[128px] lg:w-[300px] cursor-pointer" @click="openModal(index)">
                    <picture>
                        <source media="(min-width: 1024px)" :srcset="techImage.desktop">
                        <img class="w-full" :src="techImage.mobile" alt="">
                    </picture>
                </li>
            </ul>
        </div>

        <div class="overflow-x-auto pb-3">
            <table>
                <thead>
                    <th class="border-b-[2px] border-gray-1"></th>
                    <th class="text-lg font-medium px-8 pb-4 border-b-[2px] border-gray-1" v-for="header in headers">{{ $t(`product.${header}`) }}</th>
                </thead>
                <tbody>
                    <tr v-for="variant in productStore.product.item.variants" class="text-sm even:bg-gray-2">
                        <td class="pl-2"><span :class="[`${getRealizationColor(variant.realizationTime)}`]" class="flex size-2 -translate-y-[10%]"></span></td>
                        <td class="pl-8 py-1">{{ variant.symbol }}</td>
                        <td class="pl-8 py-1">{{ variant.dimensions }}</td>
                        <td class="text-center">{{ variant.doors.number }}{{ variant.doors.direction }}</td>
                        <td class="text-center">{{ variant.a }}</td>
                        <td class="text-center">{{ variant.b }}</td>
                        <td class="text-center">{{ variant.c }}</td>
                        <td class="text-center">{{ variant.h }}</td>
                        <td class="text-center">{{ variant.w }}</td>
                        <td class="text-center">{{ variant.x1 }}</td>
                        <td class="text-center">{{ variant.x2 }}</td>
                        <td class="w-fit whitespace-nowrap pl-5 font-medium bg-white">
                            <button>{{ $t('product.add-to-clipboard') }}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="grid gap-4 mt-10">
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
        </div>
        <LazySectionsCommonLightbox :images="productStore.product.item.images.tech" />
    </SectionsCommonAccordion>
</template>

<script setup>
const productStore = inject('productStore');
const headers = ['symbol', 'dimensions', 'doors', 'a', 'b', 'c', 'h', 'w', 'x1', 'x2'];
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const openModal = (index) => {
    modalIsOpen.value = true;
    galleryActiveSlide.value = index;
}

const getRealizationColor = (realizationTime) => {
    switch(realizationTime){
        case 2: return 'bg-[#41f841]';
        case 4: return 'bg-[#fa3939]';
        case 6: return 'bg-[#f0e332]';
        default: return '';
    }
}
</script>