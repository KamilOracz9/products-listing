
<template>
    <section id="home-product-tiles" class="mb-10 flex flex-col gap-5 md:gap-10 md:flex-row md:flex-wrap">
        <NuxtLink :to="'/'" class="home-product-tile relative" v-for="product in homeStore.productTiles.items">
            <NuxtImg densities="x1 x2" format="webp" class="object-cover h-[335px] w-full lg:h-[441px]" loading="lazy" :src="product.imageUrl" :alt="product.title" :title="product.title" />
            <div class="absolute z-10 text-white bottom-4 left-4 uppercase">
                <h3 class="font-medium text-xl sm:text-[1.875rem]">{{ product.title }}</h3>
                <h4 class="text-md sm:text-[1.25rem]">{{ product.subtitle }}</h4>
            </div>
        </NuxtLink>
    </section>
</template>

<script setup>
const homeStore = useHomeStore();
</script>