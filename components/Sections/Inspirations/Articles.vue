<template>
    <ul class="gap-10 grid md:grid-cols-3" :class="props.class ? props.class : ''">
        <SectionsInspirationsArticlesItem v-for="(article, index) in articles" :key="index" :article="article"
            :categorySlug="categorySlug" />
    </ul>
</template>

<script setup>
const props = defineProps(['articles', 'categorySlug', 'class']);
const { articles, categorySlug } = props;
</script>