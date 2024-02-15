<template>
    <ul class="gap-10 grid md:grid-cols-3" :class="props.class ? props.class : ''">
        <SectionsInspirationsArticlesItem v-for="(article, index) in articles" :key="index" :article="article" data-aos="fade-up" :data-aos-delay="100 * index"
            :categorySlug="categorySlug" />
    </ul>
</template>

<script setup>
const props = defineProps(['articles', 'categorySlug', 'class']);
const { articles, categorySlug } = props;
</script>