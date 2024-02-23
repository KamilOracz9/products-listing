<template>
    <div class="lg:px-10 lg:mb-10">
        <NuxtLink :to="localePath({ name: 'categories' }) + `/${category.slug}`">
            <img loading="lazy" width="65" height="65" class="size-[65px]" :src="category.iconUrl" :alt="category.label"
                :title="category.label">
            <p class="py-3">{{ category.label }}</p>
        </NuxtLink>
        <div class="text-sm" v-for="subcategory in category.items">
            <NuxtLink class="text-left"
                :to="{ path: localePath({ name: 'categories' }) + `/${category.slug}`, query: { type: subcategory.slug } }">
                {{ subcategory.label }}</NuxtLink>
            <ul class="pl-2 py-2" v-if="subcategory.items">
                <li v-for="subsubcategory in subcategory.items">
                    <NuxtLink
                        :to="{ path: localePath({ name: 'categories' }) + `/${category.slug}`, query: { type: subcategory.slug, doors: subsubcategory.slug } }">
                        {{ subsubcategory.label }}</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ICategory } from '~/types/category';

const localePath = useLocalePath();

const props = defineProps<{
    category?: ICategory;
}>()

const { category } = toRefs(props);
</script>