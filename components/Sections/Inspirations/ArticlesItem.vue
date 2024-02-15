<template>
    <li>
        <NuxtLink :to="localePath({ name: 'inspirations' }) + `/${categorySlug}/${article.slug}`">
            <div>
                <img :src="article.image" alt="">
            </div>
        </NuxtLink>

        <div class="flex justify-end gap-4 my-4">
            <SectionsInspirationsSocialLink v-for="(social, index) in article.socials" :social="social" :key="index" />
        </div>

        <p class="upperacse font-medium text-xl">{{ article.title }}</p>

        <p class="leading-5 my-4 md:line-clamp-2">{{ article.shortText }}</p>

        <NuxtLink class="flex gap-2 items-center">{{ $t('more') }}
            <Arrow :direction="'right'" />
        </NuxtLink>
    </li>
</template>

<script setup>
const localePath = useLocalePath();
const { article } = defineProps(['article', 'categorySlug'])
</script>