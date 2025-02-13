<template>
    <section class="my-8 flex overflow-x-auto no-scrollbar">
        <a v-for="(category, index) in data" data-aos="fade-up" :data-aos-delay="100 * index"
            :aria-label="category.name" :key="index"
            class="border-l-2 border-black px-5 text-medium-lg uppercase flex w-max min-w-[220px] items-center aos-init aos-animate hover:text-gray-4 lg:pr-5 lg:flex-1"
            style="transition: all 150ms;"
            v-on:click="router.push(category.path)" v-html="category.name"></a>
        <!-- <a v-for="(category, index) in data" data-aos="fade-up" :data-aos-delay="100 * index"
            :aria-label="category.name" :key="index"
            class="border-l-2 border-black px-5 text-medium-lg uppercase flex w-max items-center aos-init aos-animate hover:text-gray-4 xs:pr-20 sm:pr-40 sm:text-xl lg:pr-5 lg:flex-1"
            style="transition: all 150ms;"
            v-on:click="router.push(category.path)" v-html="category.name"></a> -->
    </section>
</template>

<script setup lang="ts">
import type { Category } from '~/types/home.types';

const router = useRouter();

const props = defineProps<{
    data: Category[];
}>();

const { data } = toRefs(props);
</script>