<template>
    <li class="">
        <a class="hover-opacity-60 cursor-pointer transition-all" :href="url">{{ label }}</a>
    </li>
</template>

<script setup>
const props = defineProps(['item']);

const { item: { label, url } } = props;
</script>