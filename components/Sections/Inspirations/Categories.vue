<template>
    <ul>
        <SectionsInspirationsCategoriesItem v-for="(category, index) in categories" :key="index"
            :category="category" />
    </ul>
</template>

<script setup lang="ts">
import type { Category } from '~/types/inspirations.types';

const props = defineProps<{
    categories: Category[];
}>();

const { categories } = toRefs(props);
</script>