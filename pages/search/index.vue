<template>
    <Suspense>
        <div class="mb-10 flex flex-col gap-10">
            <h1 class="section-title">{{ $t('pages.search.title') + searchQuery }}</h1>

            <div
                v-if="(!route.query.searchInProducts && !route.query.searchInInspirations) || route.query.searchInProducts">
                <div class="flex justify-between pb-6 border-b border-gray-1">
                    <h2 class="text-3xl uppercase">{{ $t('pages.search.products') }}</h2>
                    <p>{{ $t('pages.search.found-positions') + products.length }}</p>
                </div>

                <div
                    class="grid gap-5 grid-cols-1 mt-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    <NuxtLink :to="localePath({ name: 'products' }) + `/${product.slug}`" v-for="product in products"
                        class="flex flex-col gap-2">
                        <div>
                            <img :src="product.media?.main['460_613']" alt="">
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
                    <p>{{ $t('pages.search.found-positions') + articles.length }}</p>
                </div>

                <div
                    class="grid gap-5 grid-cols-1 mt-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    <NuxtLink :to="localePath({ name: 'inspirations' }) + `/${article.slug}`"
                        v-for="article in articles" class="flex flex-col gap-2">
                        <div>
                            <img :src="article.image.mobile" alt="">
                        </div>
                        <p class="font-semibold leading-[1.1]">{{ article.title }}</p>
                        <p class="text-sm leading-[1.1]">{{ article.description_short }}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <template #fallback>
            <Loading />
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchSearchResults } from '~/services/api/search';
import type { Results } from '~/types/search.types';

const route = useRoute();
const localePath = useLocalePath();

const query = {
    search: route.query.search,
    searchInProducts: + !!route.query.searchInProducts,
    searchInInspirations: + !!route.query.searchInInspirations,
}

const { data } = await useAsyncData(DataKeys.SEARCH_RESULT, () => fetchSearchResults(query));
const { products, articles } = toRefs(data.value as Results);

</script>