<template>
    <section>
        <div v-if="!pending && !categoryPagePending && !filtersPending">
            <SectionsCommonBreadrumbs v-if="categoryPage?.breadcrumbs" :breadcrumbs="categoryPage.breadcrumbs" />

            <h1
                class="uppercase text-[2rem] leading-[2.375rem] mt-0 mb-2 font-medium sm:text-[2.25rem] sm:leading-[2.75rem]">
                {{ categoryPage?.name ?? $t('products') }}</h1>

            <div class="mt-10 flex gap-10">
                <LazySectionsProductsSidebar />
                <div class="w-full lg:w-3/4 xl:w-full">
                    <p v-if="categoryPage?.description_short" class="pb-3.5 mb-5 border-b text-lg"
                        v-html="categoryPage.description_short"></p>

                    <SectionsProductsCategories v-if="categoryPage" :categories="categoryPage?.categories" />

                    <button @click="productsFilterStore.toggleMenuIsOpen"
                        :aria-label="`${$t('filtering')}} / ${$t('sorting')}`" class="my-10 underline text-2xl lg:hidden">{{
                            $t('filtering') }} / {{ $t('sorting') }}</button>

                    <LazySectionsProductsListing v-if="!pending" :products="data.data" />


                    <LazySectionsProductsPagination v-if="data.meta.last_page > 1" :meta="data.meta" />

                    <p v-if="categoryPage?.description"
                        class="pt-3.5 mb-10 border-t text-lg [&_ul]:list-disc [&_ul]:px-5 [&_h2]:text-[1.75rem] [&_h2]:pt-10 [&_h2]:pb-4 [&_h2]:font-medium [&_h3]:text-[1.5rem] [&_h3]:font-medium"
                        v-html="categoryPage?.description"></p>
                </div>
            </div>

            <div>
                <slot />
            </div>
        </div>

        <LoadingIndicator v-if="pending || categoryPagePending || filtersPending" />
    </section>
</template>

<script setup>
import { DataKeys } from '~/enums/dataKeys';
import { fetchFilters, fetchProducts } from '~/services/api';
import { fetchCategoryPage } from '~/services/api/category';

const globalStore = useGlobalStore();
const productsFilterStore = useProductsFilterStore();
const route = useRoute();
const activeCategory = computed(() => globalStore.header?.products.items.categories.filter(category => category.slug === route.params.category)[0]);

const { data, pending } = await useAsyncData(DataKeys.PRODUCTS_LIST, async () => fetchProducts({ ...route.query, 'category': route.params.category ?? null }), { watch: [() => route.query] });
const { data: categoryPage, pending: categoryPagePending } = await useAsyncData(DataKeys.CATEGORY_PAGE, async () => fetchCategoryPage(route.params.category));
const { data: filtersData, pending: filtersPending, refresh: filtersRefresh } = await useAsyncData(DataKeys.FILTERS_LIST, async () => fetchFilters({ ...route.query, 'category': activeCategory.value?.id ? [activeCategory.value?.id] : null }));

provide('filtersData', filtersData);
provide('filtersRefresh', filtersRefresh);

onMounted(() => {
    watch(() => route.query.page, value => {
        if (value) document.querySelector('h1').scrollIntoView();
    })

    setMeta(categoryPage.value.meta)
})
</script>