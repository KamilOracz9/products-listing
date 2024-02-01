<template>
    <ul class="flex overflow-auto my-10 gap-4 pb-3">
        <li class="cursor-pointer" v-for="(image, index) in productStore.product.item.images.attachments" @click="openModal(index)">
            <img class="min-w-[126px] aspect-[1/1] max-w-[150px]" :src="image.thumb" alt="">
        </li>
    </ul>

    <LazySectionsCommonLightbox :images="productStore.product.item.images.attachments" />
</template>

<script setup>
const productStore = inject('productStore');
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

const openModal = (index) => {
    modalIsOpen.value = true;
    galleryActiveSlide.value = index;
}
</script>