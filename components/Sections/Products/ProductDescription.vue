<template>
    <SectionsProductsAccordion :label="$t('product.product-description')" id="product-description">
        <p>{{ productStore.product.item.description }}</p>
        <div v-if="productStore.product.item.colors.length" class="my-3">
            <p class="font-medium">{{ $t('product.desc-colors') }}</p>
            <ul class="flex flex-wrap">
                <li v-for="color in productStore.product.item.colors">
                    <NuxtLink :to="color.path">
                        <img class="w-[70px] aspect-[1/1]" :src="color.image" alt="">
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div v-if="productStore.product.item.descriptionIcons.length">
            <ul class="flex gap-2 flex-wrap">
                <li v-for="descriptionIcon in productStore.product.item.descriptionIcons" class="w-1/4 sm:w-[calc(100%/7)] xl:w-auto xl:max-w-[74px]">
                    <picture>
                        <img class="aspect-[1/1] w-full" :src="descriptionIcon.icon" alt="">
                    </picture>
                </li>
            </ul>
        </div>
        <div class="my-3" v-if="productStore.product.item.images.doorOpens.length">
            <p class="font-medium">{{ $t('product.desc-doors') }}</p>
            <ul class="flex flex-wrap gap-2">
                <li v-for="(doorsOpen, index) in productStore.product.item.images.doorOpens" class="w-1/2 max-w-[126px] cursor-pointer" @click="openModal(index)">
                    <img :src="doorsOpen.thumb" alt="">
                </li>
            </ul>
        </div>

        <LazySectionsCommonLightbox :images="productStore.product.item.images.doorOpens" />
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