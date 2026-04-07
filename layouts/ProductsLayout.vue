<template>
    <div class="flex">
        <section class="w-full">
            <div>
                <div class="mt-10 flex gap-10">
                    <SectionsProductsSidebar :key="queryString" />
                    <div class="w-full" v-if="!categoryPagePending && !productsPending">
                        <SectionsProductsCategories v-if="categoryPage" :categories="categoryPage?.categories" />

                        <button @click="productsFilterStore.toggleMenuIsOpen" :aria-label="`${$t('filtering')}}`"
                            class="my-10 underline text-2xl lg:hidden">{{
                                $t('filtering') }}</button>
                        <div class="w-full">
                            <SectionsProductsListing :products="filteredProducts" />

                            <SectionsProductsPagination :perPage="perPage" :currentPage="currentPage"
                                :productsCount="productsCount" />
                        </div>
                    </div>
                    <Loading v-else />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import Loading from '~/components/Loading.vue';
import { DataKeys } from '~/enums/dataKeys';
import { fetchCategoryPage } from '~/services/api/category';
import { fetchFilters, fetchProducts } from '~/services/api/products';

const route = useRoute();
const { $locale } = useNuxtApp();

const productsFilterStore = useProductsFilterStore();

const filtersKey = computed(() => `${DataKeys.FILTERS_LIST}-${$locale}-${route.params.category}`);
const productsKey = computed(() => `${DataKeys.PRODUCTS_LIST}-${$locale}-${route.params.category}`);
const categoryPageKey = computed(() => `${DataKeys.CATEGORY_PAGE}-${$locale}-${route.params.category}`);

const queryString = computed(() => new URLSearchParams(route.query as Record<string, string>).toString());

const { data: categoryPage, pending: categoryPagePending } = await useAsyncData(
    categoryPageKey,
    async () => fetchCategoryPage(route.params.category, $locale),
);

const { data: filtersData, pending: filtersPending } = await useAsyncData(
    filtersKey,
    async () => fetchFilters({ 'category': route.params.category }, $locale),
);

const { data: productsData, pending: productsPending } = await useAsyncData(
    productsKey,
    async () => fetchProducts({ 'category': route.params.category }, $locale),
);

const mappedProductDirectionsQuery = computed(() => (Array.isArray(route.query['orientacja-produktu[]']) ? route.query['orientacja-produktu[]'] : [route.query['orientacja-produktu[]']])
    .map(value => {
        switch (value) {
            case 'p':
                return 142;
            case 'l':
                return 141;
            case 'u':
                return 143;
            case 'nd':
                return 177;
            default:
                return null;
        }
    }))

const { filteredProductsIds } = useFilteredProducts(filtersData, computed(() => route.query));

const filteredProducts = computed(() => {
    if (!productsData.value) return [];

    return productsData.value.filter(product =>
        filteredProductsIds.value.length
            ? filteredProductsIds.value.includes(product.product_id)
            : true
    ).filter(product => {
        return (!route.query.width || product.width == parseInt(route.query.width as string))
            && (!route.query.height || product.height == parseInt(route.query.height as string))
            && (!route.query.length || product.length == parseInt(route.query.length as string))
            && (!route.query['orientacja-produktu[]'] || mappedProductDirectionsQuery.value.includes(product.product_direction_id))
    });
});

const perPage = 20;
const currentPage = computed(() => parseInt(route.query.page as string) || 1);
const productsCount = computed(() => filteredProducts.value.length);

provide('filtersData', filtersData);

const isReady = ref(false)

onMounted(() => {
    isReady.value = true
})
</script>