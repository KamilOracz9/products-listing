<template>
    <div class="w-full aspect-[1/1] mt-6 sm:aspect-[2/1] lg:aspect-[5/3] lg:mt-10" data-aos="fade-up">
        <picture>
            <source media="min-width: (1024px)" :srcset="image.desktop" />
            <source media="min-width: (640px)" :srcset="image.tablet" />
            <img :src="image.mobile" alt="" class="w-full h-full object-cover">
        </picture>
    </div>
</template>

<script setup>
const { image } = defineProps(['image']);
</script>