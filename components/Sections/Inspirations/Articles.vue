<template>
    <ul class="gap-10 grid md:grid-cols-3" :class="listClass ? listClass : ''">
        <SectionsInspirationsArticlesItem v-for="(article, index) in articles" :key="index" :article="article"
            data-aos="fade-up" :data-aos-delay="100 * index" />
    </ul>
</template>

<script setup lang="ts">
import type { Inspiration } from '~/types/inspirations.types';

const props = withDefaults(defineProps<{
    listClass?: string;
    articles: Inspiration[];
}>(), {
    listClass: '',
});

const { articles, listClass } = toRefs(props);
</script>