<template>
    <ul class="flex overflow-auto my-10 gap-4 pb-3">
        <li v-for="image in productStore.product.item.images.attachments">
            <img class="min-w-[126px] aspect-[1/1] max-w-[150px]" :src="image.thumb" alt="">
        </li>
    </ul>
</template>

<script setup>
const productStore = inject('productStore');
</script>