<template>
    <ul class="gap-10 grid md:grid-cols-3" :class="listClass ? listClass : ''">
        <SectionsInspirationsArticlesItem :categorySlug="categorySlug" v-for="(article, index) in articles" :key="index" :article="article"
            data-aos="fade-up" :data-aos-delay="100 * index" />
    </ul>
</template>

<script setup lang="ts">
import type { Article } from '~/types/inspirations.types';

const props = withDefaults(defineProps<{
    listClass?: string;
    articles: Article[];
    categorySlug: string;
}>(), {
    listClass: '',
});


</script>