<template>
    <li class="mb-20" :id="category.slug.toString()">
        <div class="border-b border-black flex flex-col gap-4 pb-4 mb-6 sm:flex-row sm:justify-between">
            <p class="text-[1.5rem] uppercase sm:text-[1.875rem]">{{ category.name }}</p>
            <NuxtLink :to="path" :aria-label="category.name" class="flex gap-2 uppercase">{{
                $t('pages.inspirations.see-all') }} <Arrow :direction="'right'" />
            </NuxtLink>
        </div>

        <SectionsInspirationsArticles :articles="category.articles" :categorySlug="category.slug" />
    </li>
</template>

<script setup lang="ts">
import type { Category } from '~/types/inspirations.types';

const localePath = useLocalePath();

const props = defineProps<{
    category: Category;
}>();

const { category } = toRefs(props);

const path = computed(() => localePath({ name: 'inspirations' }) + `/${category.value.slug}/`);

</script>