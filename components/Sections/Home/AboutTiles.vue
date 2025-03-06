<template>
    <section class="grid pt-6 gap-10 md:grid-cols-2 xl:grid-cols-4">
        <a :key="index" v-on:click="router.push(aboutTile.path)" v-for="(aboutTile, index) in data"
            :aria-label="aboutTile.title"
            class="px-8 py-6 transition-all cursor-pointer bg-gray-2 hover:bg-yellow-2 sm:p-8">
            <figure class="flex items-center justify-center ">
                <div class="max-w-[100px] flex justify-center">
                    <img :src="aboutTile.icon" width="73" height="73" :alt="aboutTile.title" :title="aboutTile.title"
                        loading="lazy" />
                </div>
                <figcaption class="uppercase flex-1 pl-4">
                    <h2>
                        <p class="text-2xl">{{ aboutTile.subtitle }}</p>
                        <p class="text-[1.75rem] font-medium">{{ aboutTile.title }}</p>
                    </h2>
                </figcaption>
            </figure>
            <div class="hidden w-full xs:block xs:mt-4">
                <p v-html="aboutTile.description"></p>
                <p class="uppercase pt-4 flex gap-2">{{ $t('more') }}
                    <Arrow :direction="'right'" />
                </p>
            </div>
        </a>
    </section>
</template>

<script setup lang="ts">
import type { Box } from '~/types/home.types';

const router = useRouter();

const props = defineProps<{
    data: Box[];
}>();
const { data } = toRefs(props);
</script>