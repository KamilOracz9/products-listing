<template>
    <section class="bg-gray-2 mt-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10" data-aos="fade-up">
        <picture class="h-[400px] block lg:h-fit">
            <source media="(min-width: 640px)"
                srcset="https://newtrendy.pl/app/uploads/2023/07/na_wymiar_800x400.jpg" />
            <img :title="'Kabiny prysznicowe'" loading="lazy"
                src="https://newtrendy.pl/app/uploads/2023/07/na_wymiar_800x400.jpg" :alt="'Kabiny prysznicowe'"
                class="w-full h-full object-cover rounded-br-lg">
        </picture>
        <div class="uppercase p-6 lg:pl-0 lg:max-w-[90%] xl:max-w-[70%]">
            <p class="text-lg xl:text-[1.625rem]">{{ data.subtitle }}</p>
            <p class="text-[1.75rem] mt-2 xl:text-[3.75rem] xl:mt-8">{{ data.title }}</p>
            <p class="normal-case py-6 text-sm lg:text-base">{{ data.text }}</p>
            <NuxtLink :to="data.path" class="flex gap-2 text-[1.25rem] font-medium">{{ data.more_text }}
                <Arrow :direction="'right'" />
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Customized } from '~/types/home.types';

const props = defineProps<{
    data: Customized;
}>();
const { data } = toRefs(props);
</script>