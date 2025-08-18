<template>
    <SectionsCommonAccordion :label="$t('product.glass-types')" id="glass-types">
        <div class="overflow-x-auto">
            <ul class="flex gap-2 pb-3 max-w-[63cqi]">
                <li v-for="(glass, index) in glasses" @click="openModal(index)"
                    class="min-w-[128px] aspect-[1/1] cursor-pointer">
                    <img :src="glass.thumbnail" alt="">
                </li>
            </ul>
        </div>
        <LazySectionsCommonLightbox :images="glasses" />
    </SectionsCommonAccordion>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';

const props = defineProps<{
    glasses: IPhoto[];
}>();

const { glasses } = toRefs(props);

const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

const openModal = (index: number) => {
    modalIsOpen.value = true;
    galleryActiveSlide.value = index;
}

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);
</script>