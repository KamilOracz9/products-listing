<template>
    <div class="mb-10 flex flex-col gap-10">
        <h1 v-if="route.query.search" class="section-title">{{ $t('pages.search.title') + route.query.search }}</h1>

        <template v-if="!pending && data">
            <div
                v-if="(!route.query.searchInProducts && !route.query.searchInInspirations) || route.query.searchInProducts">
                <div class="flex justify-between pb-6 border-b border-gray-1">
                    <h2 class="text-3xl uppercase">{{ $t('pages.search.products') }}</h2>
                    <p>{{ $t('pages.search.found-positions') + data?.products.length }}</p>
                </div>

                <div
                    class="grid gap-5 grid-cols-1 mt-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    <NuxtLink :to="localePath({ name: 'product-slug', params: {slug: product.slug} })"
                        :aria-label="product.name" v-for="product in data?.products" class="flex flex-col gap-2 relative">
                        <SectionsProductsBadge :badge="product.badge" />
                        <p :class="product.symbol.toLowerCase() !== route.query.search.toLowerCase() ? 'text-gray-1' : ''" class="font-semibold text-lg leading-[1.1]">{{ product.symbol }}</p>
                        <div>
                            <img width="460" height="613" :src="product.media['460_613']" alt="">
                        </div>
                        <p class="font-semibold leading-[1.1]">{{ product.name }}</p>
                        <p class="text-sm leading-[1.1]">{{ product.description_short }}</p>
                    </NuxtLink>
                </div>
            </div>

            <div
                v-if="(!route.query.searchInProducts && !route.query.searchInInspirations) || route.query.searchInInspirations">
                <div class="flex justify-between pb-6 border-b border-gray-1">
                    <h2 class="text-3xl uppercase">{{ $t('pages.search.inspirations') }}</h2>
                    <p>{{ $t('pages.search.found-positions') + data?.articles.length }}</p>
                </div>

                <div
                    class="grid gap-5 grid-cols-1 mt-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    <NuxtLink :to="localePath({ name: 'inspirations' }) + `/${article.slug}`" :aria-label="article.title"
                        v-for="article in data?.articles" class="flex flex-col gap-2">
                        <div>
                            <img loading="lazy" :src="article.image.mobile" alt="">
                        </div>
                        <p class="font-semibold leading-[1.1]">{{ article.title }}</p>
                        <p class="text-sm leading-[1.1]">{{ article.description_short }}</p>
                    </NuxtLink>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchSearchResults } from '~/services/api/search';

const route = useRoute();
const localePath = useLocalePath();

const query = computed(() => ({
    search: route.query.search as string,
    searchInProducts: + !!route.query.searchInProducts,
    searchInInspirations: + !!route.query.searchInInspirations,
}))

watch(query, () => {
    refreshNuxtData()
})

const { data, pending } = await useAsyncData(DataKeys.SEARCH_RESULT, async () => fetchSearchResults(getLocaleIso(), query.value), { watch: [query] });
</script>