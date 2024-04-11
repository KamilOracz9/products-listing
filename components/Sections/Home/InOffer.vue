<template>
    <section id="home-products" class="bg-gray-2 px-10 pb-6 mt-7 h-fit sm:text-[1.25rem] sm:leading-6" v-html="data.html" />
</template>

<script setup lang="ts">
const props = defineProps<{
    data: {
        html: string;
    };
}>();
const { data } = toRefs(props);
</script>