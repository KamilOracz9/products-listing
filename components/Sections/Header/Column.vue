<template>
    <div class="border-r border-gray-1 lg:my-10 last:border-r-0">
        <slot />

        <SectionsHeaderColumnItem v-for="category in column?.items" :category="category" />
    </div>
</template>

<script setup lang="ts">
import type { ICategory } from '~/types/category';

const props = defineProps<{
    column?: {
        items: ICategory[];
    }
}>()

const { column } = toRefs(props);
</script>