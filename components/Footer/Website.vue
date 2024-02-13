<template>
    <li class="flex gap-3">
        <a class="footer__url" :href="url">{{ label }}</a>
    </li>
</template>

<script setup>
const props = defineProps(['item']);

const { item: { label, url } } = props;
</script>