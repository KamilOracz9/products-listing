<template>
    <section>
        <div>
            <SectionsCommonBreadrumbs v-if="categoryPage?.breadcrumbs" :breadcrumbs="categoryPage.breadcrumbs" />

            <h1
                class="uppercase text-[2rem] leading-[2.375rem] mt-0 mb-2 font-medium sm:text-[2.25rem] sm:leading-[2.75rem]">
                {{ categoryPage?.name ?? $t('products') }} {{ hasOneFilter ? ` - ${getFilterBySlug(firstParam)?.label ??
                    ''}` : ''
                }}</h1>

            <div class="mt-10 flex gap-10">
                <SectionsProductsSidebar />
                <div class="w-full">
                    <p v-if="categoryPage?.description_short" class="pb-3.5 mb-5 border-b text-lg"
                        v-html="categoryPage.description_short"></p>

                    <SectionsProductsCategories v-if="categoryPage" :categories="categoryPage?.categories" />

                    <button @click="productsFilterStore.toggleMenuIsOpen"
                        :aria-label="`${$t('filtering')}} / ${$t('sorting')}`"
                        class="my-10 underline text-2xl lg:hidden">{{
                            $t('filtering') }} / {{ $t('sorting') }}</button>

                    <template v-if="!pending">
                        <SectionsProductsListing :products="data.data" />

                        <SectionsProductsPagination v-if="data.meta.last_page > 1" :meta="data.meta" />
                    </template>
                    <template v-else>
                        <Loading />
                    </template>

                    <div v-if="categoryPage?.description && ((route.query.page == 1 && Object.keys(route.query).length === 1) || Object.keys(route.query).length === 0)"
                        class="pt-3.5 mb-10 border-t text-lg [&_ul]:list-disc [&_ul]:px-5 [&_h2]:text-[1.75rem] [&_h2]:pt-10 [&_h2]:pb-4 [&_h2]:font-medium [&_h3]:text-[1.5rem] [&_h3]:font-medium"
                        v-html="categoryPage?.description"></div>
                </div>
            </div>

            <div>
                <slot />
            </div>
        </div>
    </section>
</template>

<script setup>
import { DataKeys } from '~/enums/dataKeys';
import { fetchFilters, fetchProducts } from '~/services/api';
import { fetchCategoryPage } from '~/services/api/category';

const FILTERS_DISABLED_FROM_INDEXING = [
    'length_min', 'length_max', 'height_min', 'height_max', 'width_min', 'width_max', 'page'
];

const i18n = useI18n();
const globalStore = useGlobalStore();
const productsFilterStore = useProductsFilterStore();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const url = useRequestURL();
const { $locale } = useNuxtApp();

const routeQuery = computed(() => Object.fromEntries(
    Object.entries(route.query).map(([filterCategory, value_slug]) => ([
        filterCategory,
        typeof (value_slug) !== 'object'
            ? filtersData.value.filters[filterCategory.replace('[]', '')].find(filter => filter.value_slug == value_slug).value
            : value_slug.map(item => filtersData.value.filters[filterCategory.replace('[]', '')].find(filter => filter.value_slug == item).value)
    ]))
))

const { data: categoryPage, pending: categoryPagePending } = await useAsyncData(DataKeys.CATEGORY_PAGE, async () => fetchCategoryPage(route.params.category, $locale));
const { data: filtersData, pending: filtersPending, refresh: filtersRefresh } = await useAsyncData(DataKeys.FILTERS_LIST, async () => fetchFilters({ 'category': categoryPage.value.slug ?? null }, $locale));

// console.log(Object.fromEntries(Object.entries(route.query).map(([filterCategory, value]) => ([filterCategory, filtersData.value.filters[filterCategory.replace('[]', '')]]))))
// console.log(Object.fromEntries(Object.entries(route.query).map(([filterCategory, value]) => ([filterCategory, filtersData.value.filters[filterCategory.replace('[]', '')].find(item => item.value == value).value_slug]))))

const { data, pending } = await useAsyncData(DataKeys.PRODUCTS_LIST, async () => fetchProducts({ ...route.query, 'category': categoryPage.value.slug ?? null }, $locale), { watch: [() => route.query] });

provide('filtersData', filtersData);
provide('filtersRefresh', filtersRefresh);

// const loading = computed(() => pending.value || categoryPagePending.value || filtersPending.value);

// watch(loading, (newValue) => {
//     globalStore.pageIsLoading = newValue;
// })

// const canonical = computed(() => pageIndexable.value ? url.href : `${url.origin}${url.pathname}/`);

// const next = computed(() => {
//     const page = route.query.page ? parseInt(route.query.page) : 1;

//     return page < data.value.meta.last_page ? `${canonical.value}?page=${page + 1}` : null
// });

// const prev = computed(() => {
//     const page = route.query.page ? parseInt(route.query.page) : 1;

//     return page > 1 ? `${canonical.value}?page=${page - 1}` : null
// });

// const headLinks = computed(() => {
//     const links = [];

//     canonical.value && links.push({ rel: 'canonical', href: canonical.value });
//     next.value && links.push({ rel: 'next', href: next.value });
//     prev.value && links.push({ rel: 'prev', href: prev.value });

//     return links;
// });

// const firstParam = computed(() => {
//     switch (typeof (Object.values(route.query)[0])) {
//         case 'string': return Object.values(route.query)[0];
//         case 'object': return Object.values(route.query)[0][0];
//     }
// })

// const indexedQueryParams = computed(() => Object.fromEntries(Object.entries(route.query).filter(item => !FILTERS_DISABLED_FROM_INDEXING.includes(item[0]))));

// const hasMoreThenOneFilter = computed(() => new URLSearchParams(route.query).size > 1 || Array.isArray(Object.values(route.query)[0]));

// const hasOneFilter = computed(() =>
//     new URLSearchParams(indexedQueryParams.value).size === 1
//     && typeof (Object.values(indexedQueryParams.value)[0]) === 'string'
//     || Object.values(indexedQueryParams.value)[0]?.length === 1);

// const pageIndexable = computed(() => (!hasMoreThenOneFilter.value));

// const metaParams = computed(() => Object.values(filtersData.value.filters)
//     .flatMap(({ options }) => options)
//     .filter(({ value_slug }) => Object.values(route.query).flat().includes(value_slug))
//     .map((({ label }) => label))
//     .join(', '));

// const meta = computed(() => ([
//     {
//         name: 'robots', content: (pageIndexable.value && !((i18n.locale.value === 'pl' && url.host !== 'newtrendy.pl') || (url.host !== 'newtrendy.eu' && i18n.locale.value !== 'pl')))
//             ? `index, follow, max-image-preview: large, max-snippet: -1, max-video-preview: -1`
//             : `noindex, nofollow`
//     },
// ]))

// const getFilterBySlug = (slug) => Object.values(filtersData.value.filters).flatMap(({ options }) => options).find(({ value_slug }) => value_slug === slug);

// watch(router.currentRoute, () => {
//     document.querySelector('link[rel="next"]')?.remove();
//     document.querySelector('link[rel="prev"]')?.remove();

//     setMeta({ meta_description: categoryPage.value.meta.meta_description, meta_title: `${categoryPage.value.name ?? i18n.t('meta.products.title')}${metaParams.value ? ' - ' + metaParams.value : ''} | New Trendy` })
// }, { deep: true })

// setMeta({ meta_description: categoryPage.value.meta.meta_description, meta_title: `${categoryPage.value.name ?? i18n.t('meta.products.title')}${metaParams.value ? ' - ' + metaParams.value : ''} | New Trendy` })

// useSeoMeta(meta.value)

// useHead(() => ({
//     link: headLinks.value,
// }))

// useSchemaOrg([categoryPage.value.schema])

// onMounted(() => {
//     if (route.params.category && (route.params.category !== categoryPage.value.slug)) router.push(localePath({ name: 'products-category', params: { 'category': categoryPage.value.slug } }));

//     watch(() => route.query.page, value => {
//         if (value) document.querySelector('h1').scrollIntoView();
//     })
// })
</script>