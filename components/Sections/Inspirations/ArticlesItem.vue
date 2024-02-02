<template>
    <li>
        <NuxtLink>
            <div>
                <img :src="article.image" alt="">
            </div>
        </NuxtLink>

        <div class="flex justify-end gap-4 my-4">
            <SectionsInspirationsSocialLink v-for="(social, index) in article.socials" :social="social" :key="index" />
        </div>

        <p class="upperacse font-medium text-xl">{{ article.title }}</p>

        <p class="leading-5 my-4 md:line-clamp-2">{{ article.shortText }}</p>

        <NuxtLink class="flex gap-2">{{ $t('more') }} <img src="@/assets/icons/arrow.svg" class="-rotate-90" alt=""></NuxtLink>
    </li>
</template>

<script setup>
const { article } = defineProps(['article'])
</script>