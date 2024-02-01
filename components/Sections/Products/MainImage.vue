<template>
    <picture class="w-full cursor-pointer" @click="modalIsOpen = true">
        <source media="(min-width:768px)" :srcset="productStore.product.item.images.main.desktop">
        <source media="(min-width:450px)" :srcset="productStore.product.item.images.main.tablet">
        <img :src="productStore.product.item.images.main.mobile" class="w-full aspect-[3/4] object-cover rounded-tr-[36px]">
    </picture>
</template>

<script setup>
const productStore = inject('productStore');
const modalIsOpen = inject('modalIsOpen');
</script>