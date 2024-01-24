
<template>
    <section id="home-product-tiles" class="mb-10 flex flex-col gap-5 md:gap-10 md:flex-row md:flex-wrap">
        <NuxtLink class="home-product-tile relative" v-for="product in homeStore.productTiles.items">
            <img class="object-cover h-[335px] w-full lg:h-[441px]" loading="lazy" :src="product.imageUrl" alt="" />
            <div class="absolute z-10 text-white bottom-4 left-4 uppercase">
                <p class="font-medium text-xl sm:text-[1.875rem]">{{ product.title }}</p>
                <p class="text-md sm:text-[1.25rem]">{{ product.subtitle }}</p>
            </div>
        </NuxtLink>
    </section>
</template>

<script setup>
const homeStore = useHomeStore();
</script>