<template>
    <li>
        <NuxtLink :aria-label="article.title" :to="localePath({ name: 'inspirations' }) + `/${categorySlug}/${article.slug}`">
            <picture>
                <source media="(min-width: 1280px)" :srcset="article.image.tablet">
                <source media="(min-width: 768px)" :srcset="article.image.mobile">
                <source media="(min-width: 450px)" :srcset="article.image.tablet">
                <NuxtImg :src="article.image.mobile" class="w-full aspect-[auto_735/495]" :title="article.title" :alt="article.title" sizes="100vw sm:608px md:219px lg:306px xl:389px 2xl:475px 3xl:533px" />
                <!-- <img :src="article.image.mobile" alt="" class="w-full aspect-[auto_735/495]" width="735" height="495"> -->
            </picture>
        </NuxtLink>

        <div class="flex justify-end gap-4 my-4">
            <SectionsInspirationsSocialLink v-for="(social, index) in article.socials" :social="social" :key="index" />
        </div>

        <h2 class="upperacse font-medium text-xl">{{ article.title }}</h2>

        <p class="leading-5 my-4 md:line-clamp-2">{{ article.shortText }}</p>

        <NuxtLink class="flex gap-2 items-center">{{ $t('more') }}
            <Arrow :direction="'right'" />
        </NuxtLink>
    </li>
</template>

<script setup lang="ts">
import type { IInspirationArticle } from '~/types/inspirations';

const localePath = useLocalePath();
const props = defineProps<{
    article: IInspirationArticle;
    categorySlug: string;
}>();

const { article, categorySlug } = toRefs(props);
</script>