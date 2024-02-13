<template>
    <li class="mb-20">
        <div class="border-b border-black flex flex-col gap-4 pb-4 mb-6 sm:flex-row sm:justify-between">
            <p class="text-[1.5rem] uppercase sm:text-[1.875rem]">{{ category.title }}</p>
            <NuxtLink :to="localePath({ name: 'inspirations' }) + `/${category.slug}`" class="flex gap-2 uppercase">{{
                $t('pages.inspirations.see-all') }} <Arrow :direction="'right'" />
            </NuxtLink>
        </div>

        <SectionsInspirationsArticles :articles="category.articles" :categorySlug="category.slug" />
    </li>
</template>

<script setup>
const { category } = defineProps(['category'])
const localePath = useLocalePath();
</script>