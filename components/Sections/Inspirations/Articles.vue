<template>
    <ul class="gap-10 grid md:grid-cols-3" :class="listClass ? listClass : ''">
        <SectionsInspirationsArticlesItem v-for="(article, index) in articles" :key="index" :article="article"
            data-aos="fade-up" :data-aos-delay="100 * parseInt(index)" :categorySlug="categorySlug" />
    </ul>
</template>

<script setup lang="ts">
import type { IInspirationArticle } from '@/types/inspirations';

const props = withDefaults(defineProps<{
    listClass?: string;
    articles: IInspirationArticle;
    categorySlug?: string;
}>(), {
    listClass: '',
});

const { articles, categorySlug, listClass } = toRefs(props);
</script>