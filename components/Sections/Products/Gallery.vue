<template>
    <section class="mt-2">
        <ul class="grid grid-cols-4 gap-2">
            <li v-for="(image, index) in gallery" class="cursor-pointer" @click="openModal(index)">
                <img :src="image.thumb" alt="" class="w-full aspect-[1/1] object-cover">
            </li>
        </ul>
    </section>
</template>

<script setup>
const productStore = inject('productStore');
const modalIsOpen = inject('modalIsOpen');
const galleryActiveSlide = inject('galleryActiveSlide');
const gallery = ref(productStore.product.item.images.gallery);

const openModal = (index) => {
    galleryActiveSlide.value = index;
    modalIsOpen.value = true;
}
</script>