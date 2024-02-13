<template>
    <section class="bg-gray-2 px-10 py-6 mt-7 h-fit sm:text-[1.25rem] sm:leading-6">
        <h5 class="font-bold text-lg leading-6 mt-10 mb-2 sm:text-xl">{{ $t('home.in-offer.colors') }}</h5>

        <ul class="pl-8">
            <li class="list-disc" v-for="color in homeStore.inOffer.colors">
                <NuxtLink :to="color.url" :aria-label="color.title">{{ color.title }}</NuxtLink>
            </li>
        </ul>

        <h5 class="font-bold text-lg leading-6 mt-10 mb-2 sm:text-xl">{{ $t('home.in-offer.variants') }}</h5>

        <ul>
            <li v-for="collection in homeStore.inOffer.collections" class="mb-6">
                <NuxtLink class="flex gap-2 font-bold" :to="collection.url" :aria-label="collection.title"><Arrow :direction="'right'" /><h6>{{ collection.title }}</h6></NuxtLink>
                <ul class="pl-8 mt-2">
                    <li class="list-disc" v-for="category in collection.categories">
                        <NuxtLink :to="category.url" :aria-label="category.title">{{ category.title }}</NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>

<script setup>
    const homeStore = useHomeStore();
</script>