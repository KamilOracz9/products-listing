<template>
    <ul class="gap-10 grid md:grid-cols-3">
        <SectionsInspirationsArticlesItem v-for="(article, index) in articles" :key="index" :article="article" />
    </ul>
</template>

<script setup>
const { articles } = defineProps(['articles'])
</script>