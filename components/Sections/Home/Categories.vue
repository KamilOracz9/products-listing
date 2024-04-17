<template>
    <section class="my-5 flex overflow-x-auto no-scrollbar">
        <NuxtLink v-for="(category, index) in data" data-aos="fade-up"
            :data-aos-delay="100 * index" :key="index"
            class="border-l-2 border-black px-5 text-medium-lg uppercase flex items-center xs:pr-20 sm:pr-40 sm:text-xl lg:pr-5 lg:flex-1"
            :to="category.path"
            v-html="category.name"></NuxtLink>
    </section>
</template>

<script setup lang="ts">
import type { Category } from '~/types/home.types';

const props = defineProps<{
    data: Category[];
}>();

const { data } = toRefs(props);
</script>