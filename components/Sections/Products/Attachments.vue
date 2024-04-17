<template>
    <ul class="flex overflow-auto my-10 gap-4 pb-3">
        <li class="cursor-pointer" v-for="(image, index) in images" @click="openModal(index)">
            <img class="min-w-[126px] aspect-[1/1] max-w-[150px]" :src="image.thumbnail" alt="">
        </li>
    </ul>

    <LazySectionsCommonLightbox :images="images" />
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';

const props = defineProps<{
    images: IPhoto[];
}>();

const { images } = toRefs(props);

const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

const openModal = (index: number) => {
    modalIsOpen.value = true;
    galleryActiveSlide.value = index;
}

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);
</script>