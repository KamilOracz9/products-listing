
<template>
    <section id="home-product-tiles" class="mb-4 flex flex-col gap-5 md:gap-10 md:flex-row md:flex-wrap">
        <NuxtLink data-aos="fade-up" :to="product.path" class="home-product-tile relative zoom-in h-[335px] lg:h-[441px]" :aria-label="product.title + ' ' + product.subtitle" v-for="product in data">
            <picture>
                <source media="(min-width: 1024px)" :srcset="product.image.desktop">
                <source media="(min-width: 640px)" :srcset="product.image.tablet">
                <img class="object-cover w-full h-full" loading="lazy" :src="product.image.mobile" :alt="product.title" :title="product.title" />
            </picture>
            <div class="absolute z-10 text-white bottom-4 left-4 uppercase">
                <h3 class="font-medium text-xl sm:text-[1.875rem]">{{ product.title }}</h3>
                <h4 class="text-md sm:text-[1.25rem]">{{ product.subtitle }}</h4>
            </div>
        </NuxtLink>
    </section>
</template>

<script setup lang="ts">
import type { Collection } from '~/types/home.types';

const props = defineProps<{
    data: Collection[];
}>();

const { data } = toRefs(props);

console.log(data.value)
</script>