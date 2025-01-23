<template>
    <section
        class="mt-10 lg:grid lg:grid-cols-2 lg:gap-10 [&_h2]:text-[1.875rem] [&_h2]:font-medium [&_h2]:leading-[120%] [&_h2]:mb-5"
        data-aos="fade-up">
        <div class="text-sm description sm:text-base" v-html="data.html"></div>
        <div class="mt-6 h-[275px] md:h-[385px] lg:h-full lg:mt-0">
            <picture v-if="data.image">
                <source media="(min-width: 1024px)" :srcset="data.image.desktop" />
                <source media="(min-width: 640px)" :srcset="data.image.tablet" />
                <img class="h-full w-full object-cover rounded-tl-md lg:rounded-tl-lg" loading="lazy"
                    :src="data.image.mobile" :alt="'Jakość na światowym poziomie'" :title="'Jakość na światowym poziomie'">
            </picture>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';

const props = defineProps<{
    data: {
        html: string;
        image: IPhoto;
    };
}>();
const { data } = toRefs(props);
</script>