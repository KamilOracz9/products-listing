<template>
    <div class="flex">
        <section>
            <div>
                <div class="mt-10 flex gap-10">
                    <SectionsProductsSidebar />
                    <div class="w-full" v-if="!categoryPagePending && !productsPending">
                        <SectionsProductsCategories v-if="categoryPage" :categories="categoryPage?.categories" />

                        <button @click="productsFilterStore.toggleMenuIsOpen" :aria-label="`${$t('filtering')}}`"
                            class="my-10 underline text-2xl lg:hidden">{{
                                $t('filtering') }}</button>
                        <SectionsProductsListing v-if="!productsPending" :products="filteredProducts" />

                        <SectionsProductsPagination :perPage="perPage" :currentPage="currentPage" :productsCount="productsCount" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchCategoryPage } from '~/services/api/category';
import { fetchFilters } from '~/services/api/products';

const route = useRoute();
const { $locale } = useNuxtApp();

const productsFilterStore = useProductsFilterStore();

const filtersKey = computed(() => `${DataKeys.FILTERS_LIST}-${$locale}-${route.params.category}`);
const productsKey = computed(() => `${DataKeys.PRODUCTS_LIST}-${$locale}-${route.params.category}`);
const categoryPageKey = computed(() => `${DataKeys.CATEGORY_PAGE}-${$locale}-${route.params.category}`);

const { data: categoryPage, pending: categoryPagePending } = await useAsyncData(
    categoryPageKey,
    async () => fetchCategoryPage(route.params.category, $locale),
    {
        getCachedData(key) {
            return useNuxtApp().payload.data[key] 
                ?? useNuxtApp().static.data[key];
        }
    }
);

const { data: filtersData, pending: filtersPending } = await useAsyncData(
    filtersKey,
    async () => fetchFilters({ 'category': route.params.category }, $locale),
    {
        getCachedData(key) {
            return useNuxtApp().payload.data[key] 
                ?? useNuxtApp().static.data[key];
        }
    }
);

const { data: productsData, pending: productsPending } = await useAsyncData(
    productsKey,
    async () => $fetch(`http://localhost:8000/api/newtrendy/v3/pl_PL/variants?category=${route.params.category}`),
    {
        getCachedData(key) {
            return useNuxtApp().payload.data[key] 
                ?? useNuxtApp().static.data[key];
        }
    }
);

const { filteredProductsIds } = useFilteredProducts(filtersData, computed(() => route.query));

const filteredProducts = computed(() => {
    if (!productsData.value) return [];

    return productsData.value.filter(product =>
        filteredProductsIds.value.length
            ? filteredProductsIds.value.includes(product.product_id)
            : true
    );
});

const perPage = 20;
const currentPage = computed(() => parseInt(route.query.page as string) || 1);
const productsCount = computed(() => filteredProducts.value.length);

provide('filtersData', filtersData);
</script>