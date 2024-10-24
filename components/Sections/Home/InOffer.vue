<template>
    <section id="home-products" class="bg-gray-2 px-10 pb-6 mt-7 pt-10 h-fit sm:text-[1.25rem] sm:leading-6 [&_h2]:text-[1.375rem] [&_h2]:leading-[120%] [&_h2]:font-medium [&_h2]:mb-5" v-html="data.html" />
</template>

<script setup lang="ts">
const props = defineProps<{
    data: {
        html: string;
    };
}>();
const { data } = toRefs(props);
</script>