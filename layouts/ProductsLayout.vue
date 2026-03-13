<template>
    <section>
        <div>
            <SectionsCommonBreadrumbs v-if="categoryPage?.breadcrumbs" :breadcrumbs="categoryPage.breadcrumbs" />

            <h1
                class="uppercase text-[2rem] leading-[2.375rem] mt-0 mb-2 font-medium sm:text-[2.25rem] sm:leading-[2.75rem]">
                {{ categoryPage?.name ?? $t('products') }} {{ hasOneFilter ? ` -
                ${route.query[slugify(i18n.t('filters.is_new'))] ? i18n.t('navigation.new-products') :
                        (getFilterBySlug(firstParam)?.label ??
                            '')}` : ''
                }}</h1>

            <div class="mt-10 flex gap-10" v-if="!filtersPending && filtersData">
                <SectionsProductsSidebar />
                <div class="w-full" v-if="!categoryPagePending">
                    <p v-if="categoryPage?.description_short" class="pb-3.5 mb-5 border-b text-lg"
                        v-html="categoryPage.description_short"></p>

                    <SectionsProductsCategories v-if="categoryPage" :categories="categoryPage?.categories" />

                    <button @click="productsFilterStore.toggleMenuIsOpen" :aria-label="`${$t('filtering')}}`"
                        class="my-10 underline text-2xl lg:hidden">{{
                            $t('filtering') }}</button>

                    <template v-if="!pending">
                        <template v-if="data?.products">
                            <div>
                                <SectionsProductsListing :products="data.products" />
                            </div>

                            <SectionsProductsPagination v-if="data?.meta?.last_page > 1" :meta="data?.meta" />
                        </template>

                        <div v-if="categoryPage?.description && ((route.query.page == 1 && Object.keys(route.query).length === 1) || Object.keys(route.query).length === 0)"
                        class="pt-3.5 mb-10 border-t text-lg [&_ul]:list-disc [&_ul]:px-5 [&_h2]:text-[1.75rem] [&_h2]:pt-10 [&_h2]:pb-4 [&_h2]:font-medium [&_h3]:text-[1.5rem] [&_h3]:font-medium"
                        v-html="categoryPage?.description"></div>
                    </template>
                    <div v-else>
                        <LoadingIndicator />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { DataKeys } from '~/enums/dataKeys';
import { fetchProducts } from '~/services/api';
import { fetchCategoryPage } from '~/services/api/category';
import { fetchFilters } from '~/services/api/products';

const FILTERS_DISABLED_FROM_INDEXING = [
    'length_min', 'length_max', 'height_min', 'height_max', 'width_min', 'width_max', 'page'
];

const i18n = useI18n();
const globalStore = useGlobalStore();
const productsFilterStore = useProductsFilterStore();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { $locale, $baseUrl } = useNuxtApp();
const baseUrl = $baseUrl();
const nuxtApp = useNuxtApp();

// Fetch category page data
const { data: categoryPage, pending: categoryPagePending } = await useAsyncData(
    () => `${DataKeys.CATEGORY_PAGE}-${route.params.category}`,
    async () => fetchCategoryPage(route.params.category, $locale),
    {
        watch: [() => route.params.category],
        server: true
    }
);

// Fetch products data - depends on category
const { data, pending, refresh: refreshProducts } = await useAsyncData(
    () => `${DataKeys.PRODUCTS_LIST}-${route.params.category}-${JSON.stringify(route.query)}`,
    async () => {
        const categorySlug = categoryPage.value?.slug ?? route.params.category;
        return fetchProducts({ ...route.query, 'category': categorySlug }, $locale);
    },
    {
        watch: [() => route.query, () => route.params.category, () => categoryPage.value?.slug],
        server: true
    }
);

// Fetch filters
const { data: filtersData, pending: filtersPending } = await useAsyncData(
    () => `${DataKeys.FILTERS_LIST}-${route.params.category}`,
    async () => {
        const categorySlug = categoryPage.value?.slug ?? route.params.category;
        return fetchFilters({ 'category': categorySlug }, $locale);
    },
    {
        watch: [() => route.params.category, () => categoryPage.value?.slug],
        server: true
    }
);

provide('filtersData', filtersData);
provide('filtersPending', filtersPending);
provide('refreshProducts', refreshProducts);

const loading = computed(() => pending.value || categoryPagePending.value);

watch(loading, (newValue) => {
    globalStore.pageIsLoading = newValue;
})

// console.log(data.value)

const canonical = computed(() => pageIndexable.value ? baseUrl.value.fullUrl : `${baseUrl.value.domain}${baseUrl.value.path.split('?')[0]}`);

const next = computed(() => {
    const page = route.query.page ? parseInt(route.query.page) : 1;

    return (data.value?.meta?.last_page && page < data.value.meta.last_page) ? `${canonical.value}?page=${page + 1}` : null
});

const prev = computed(() => {
    const page = route.query.page ? parseInt(route.query.page) : 1;

    return page > 1 ? `${canonical.value}?page=${page - 1}` : null
});

const headLinks = computed(() => {
    const links = [];

    canonical.value && links.push({ rel: 'canonical', href: canonical.value });
    next.value && links.push({ rel: 'next', href: next.value });
    prev.value && links.push({ rel: 'prev', href: prev.value });

    return links;
});

const firstParam = computed(() => {
    switch (typeof (Object.values(route.query)[0])) {
        case 'string': return Object.values(route.query)[0];
        case 'object': return Object.values(route.query)[0][0];
    }
})

const indexedQueryParams = computed(() => Object.fromEntries(Object.entries(route.query).filter(item => !FILTERS_DISABLED_FROM_INDEXING.includes(item[0]))));

const hasMoreThenOneFilter = computed(() => new URLSearchParams(route.query).size > 1 || Array.isArray(Object.values(route.query)[0]));

const flattenFilters = computed(() => Object.values(filtersData.value?.filters ?? {}).flat());

const hasOneFilter = computed(() =>
    new URLSearchParams(indexedQueryParams.value).size === 1
    && typeof (Object.values(indexedQueryParams.value)[0]) === 'string'
    || Object.values(indexedQueryParams.value)[0]?.length === 1);

const pageIndexable = computed(() => (!hasMoreThenOneFilter.value));

const metaParams = computed(() => {
    if (!filtersData.value?.filters) return '';

    return Object.values(filtersData.value.filters)
        .flatMap(filter => filter?.options ?? [])
        .filter(option => option?.value_slug && Object.values(route.query).flat().includes(option.value_slug))
        .map(option => option.label)
        .join(', ');
});

const meta = computed(() => ([
    {
        name: 'robots', content: (pageIndexable.value && !((i18n.locale.value === 'pl' && !baseUrl.value.domain.includes('newtrendy.pl')) || (!baseUrl.value.domain.includes('newtrendy.eu') && i18n.locale.value !== 'pl')))
            ? `index, follow, max-image-preview: large, max-snippet: -1, max-video-preview: -1`
            : `noindex, nofollow`
    },
]))

const getFilterBySlug = (slug) => {
    if (!filtersData.value?.filters || !slug) return null;

    return Object.values(filtersData.value.filters)
        .flatMap(filter => filter?.options ?? [])
        .find(option => option?.value_slug === slug);
};

watch(router.currentRoute, () => {
    document.querySelector('link[rel="next"]')?.remove();
    document.querySelector('link[rel="prev"]')?.remove();

    setMeta({ meta_description: categoryPage.value?.meta?.meta_description, meta_title: `${categoryPage.value?.name ?? i18n.t('meta.products.title')}${metaParams.value ? ' - ' + metaParams.value : ''} | New Trendy` })
}, { deep: true })

setMeta({ meta_description: categoryPage.value?.meta?.meta_description, meta_title: `${categoryPage.value?.name ?? i18n.t('meta.products.title')}${metaParams.value ? ' - ' + metaParams.value : ''} | New Trendy` })

useSeoMeta({
    robots: computed(() =>
        (pageIndexable.value && !((i18n.locale.value === 'pl' && !baseUrl.value.domain.includes('newtrendy.pl')) ||
            (!baseUrl.value.domain.includes('newtrendy.eu') && i18n.locale.value !== 'pl')))
            ? 'index, follow, max-image-preview: large, max-snippet: -1, max-video-preview: -1'
            : 'noindex, nofollow'
    )
});

useHead(() => ({
    link: headLinks.value,
}))

useSchemaOrg([categoryPage.value?.schema])

onMounted(() => {
    if (route.params.category && (route.params.category !== categoryPage.value?.slug)) router.push(localePath({ name: 'products-category', params: { 'category': categoryPage.value?.slug } }));

    watch(() => route.query.page, value => {
        if (value) document.querySelector('h1').scrollIntoView();
    })
})
</script>