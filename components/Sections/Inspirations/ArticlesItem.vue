<template>
    <li>
        <NuxtLink :aria-label="article.title"
            :to="localePath({ name: 'inspirations' }) + `/${route.params.category}/${article.slug}`">
            <picture>
                <source media="(min-width: 1280px)" :srcset="article.image.tablet">
                <source media="(min-width: 768px)" :srcset="article.image.mobile">
                <source media="(min-width: 450px)" :srcset="article.image.tablet">
                <img fetchpriority="highest" :src="article.image.mobile" alt="" class="w-full aspect-[auto_735/495]"
                    width="735" height="495">
            </picture>
        </NuxtLink>

        <div class="flex justify-end gap-4 my-4">
            <SectionsInspirationsSocialLink v-if="article.socials" v-for="(social, index) in article.socials" :social="social" :key="index" />
        </div>

        <h2 class="upperacse font-medium text-xl">{{ article.title }}</h2>

        <p class="leading-5 my-4 md:line-clamp-2">{{ article.description_short }}</p>

        <NuxtLink class="flex gap-2 items-center" :aria-label="$t('more')">{{ $t('more') }}
            <Arrow :direction="'right'" />
        </NuxtLink>
    </li>
</template>

<script setup lang="ts">
import type { Article } from '~/types/inspirations.types';

const localePath = useLocalePath();
const route = useRoute();
const props = defineProps<{
    article: Article;
}>();

const { article } = toRefs(props);
</script>