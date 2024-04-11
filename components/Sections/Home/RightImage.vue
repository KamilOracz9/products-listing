<template>
    <section class="mt-10 lg:grid lg:grid-cols-2 lg:gap-10" data-aos="fade-up">
        <div class="text-sm description sm:text-base" v-html="data.html"></div>
        <div class="mt-6 h-[275px] md:h-[385px] lg:h-full lg:mt-0">
            <!-- <picture>
                <source media="(min-width: 640px)"
                    srcset="https://newtrendy.pl/app/uploads/2023/08/prime_light_gold_r55_2-1024x542.webp" />
                <img class="h-full w-full object-cover rounded-tl-md lg:rounded-tl-lg" loading="lazy" src="https://newtrendy.pl/app/uploads/2023/08/prime_light_gold_r55_2-1024x542.webp" :alt="'Jakość na światowym poziomie'" :title="'Jakość na światowym poziomie'">
            </picture> -->
            <img class="h-full w-full object-cover rounded-tl-md lg:rounded-tl-lg" loading="lazy" :src="data.image" :alt="'Jakość na światowym poziomie'" :title="'Jakość na światowym poziomie'">
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: {
        html: string;
        image: string;
    };
}>();
const { data } = toRefs(props);
</script>