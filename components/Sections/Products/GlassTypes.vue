<template>
    <SectionsProductsAccordion :label="$t('product.glass-types')" id="glass-types">
        <div>
            <ul class="flex gap-2 overflow-x-auto pb-3">
                <li v-for="(glassType, index) in productStore.product.item.images.glasses" @click="openModal(index)" class="min-w-[128px] max-w-[128px] aspect-[1/1] cursor-pointer">
                    <img :src="glassType.thumb" alt="">
                </li>
            </ul>

            <p v-if="productStore.product.item.glassDescription" class="pt-3">{{ productStore.product.item.glassDescription }}</p>
        </div>
        <LazySectionsCommonLightbox :images="productStore.product.item.images.glasses" />
    </SectionsProductsAccordion>
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