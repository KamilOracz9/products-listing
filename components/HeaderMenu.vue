<template>
    <div ref="headerMenuRef" class="content-grid">
        <LazySectionsHeaderLogo />

        <div class="header__items" :data-active="headerStore.menuIsOpen" :key="headerStore.submenu">
            <LazySectionsHeaderItem slug="products">
                <div class="header__categories lg:[&_a]:!text-left">
                    <LazySectionsHeaderColumn class="lg:hidden">
                        <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            <NuxtLink class="text-center flex items-center flex-col" :to="getMainLink(item)"
                                :aria-label="item.name ?? item.type" v-for="item in Object.values(columns).flat()">
                                <img loading="lazy" width="65" height="65" class="size-[65px]" :src="item.image" alt=""
                                    :title="item.name" />
                                <p class="py-3">{{ item.type === 'collections' ? $t('navigation.collections') :
                                    item.name }}</p>
                            </NuxtLink>
                        </div>
                    </LazySectionsHeaderColumn>
                    <LazySectionsHeaderColumn v-for="(column, index) in columns" class="hidden lg:block">
                        <div class="lg:px-8 lg:mb-10" v-for="item in column?.map(item => {
                            item.url = item.slug ? localePath({ name: 'categories' }) + `/${item.slug}` : localePath({ name: item.type })

                            return item;
                        })">
                            <NuxtLink :to="item.url" :aria-label="item.name ?? item.type">
                                <img loading="lazy" width="65" height="65" class="size-[65px]" :src="item.image" alt=""
                                    :title="item.name" />
                                <p class="py-3">{{ item.type === 'collections' ? $t('navigation.collections') :
                                    item.name }}</p>
                            </NuxtLink>
                            <div class="text-sm" v-for="subitem in item.items">
                                <NuxtLink :to="getLink(item, subitem)" :aria-label="subitem.name">
                                    {{ subitem.name }}</NuxtLink>

                                <div class="text-[0.8125rem] my-2 ml-2"
                                    v-if="subitem.items ? !!subitem.items.length : false">
                                    <NuxtLink v-for="subsubitem in subitem.items" :aria-label="subitem.name"
                                        :to="getLink(item, subsubitem)">
                                        {{ subsubitem.name }}</NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div v-if="index == 5" class="lg:px-8 lg:mb-10">
                            <NuxtLink :to="localePath({ name: 'categories' })"
                                :aria-label="$t('navigation.all-products')">
                                {{ $t('navigation.all-products') }}
                            </NuxtLink>
                        </div>
                    </LazySectionsHeaderColumn>
                </div>
            </LazySectionsHeaderItem>

            <LazySectionsHeaderItem :slug="slug" position="sticky"
                v-for="slug in ['inspirations', 'for-professionals', 'about-us', 'contact']">
                <div class="header__links-ref">
                    <div class="header__links">
                        <NuxtLink :external="false" v-for="item in header[slug].items" :to="item.path"
                            :aria-label="item.label">
                            {{ item.label }}
                        </NuxtLink>
                    </div>
                </div>
            </LazySectionsHeaderItem>

            <NuxtLink
                class="header__label w-full flex justify-center mb-4 lg:w-fit gap-2 items-center lg:mx-4 lg:ml-auto lg:my-auto"
                :to="localePath({ name: 'download' })" :aria-label="$t('download')">
                <img width="16" height="16" class="header__icon" src="@/assets/icons/download.svg" alt="">
                <p class="lg:hidden xl:block">{{ $t('download') }}</p>
            </NuxtLink>

            <LazySectionsHeaderItem slug="search" :icon="searchIcon">
                <div class="w-full flex justify-center left-0 [&_a]:border-black [&_button]:border-black">
                    <div class="w-[90%] max-w-[1300px] flex flex-col gap-4 py-4 lg:pb-8 lg:flex-row lg:flex-wrap">
                        <div class="flex flex-col lg:flex-row lg:flex-wrap lg:ml-auto">
                            <div class="flex gap-2 flex-wrap lg:flex-nowrap lg:flex-row">
                                <div class="flex items-center justify-start gap-2">
                                    <input id="search-in-products" type="checkbox" name="item"
                                        class="lg:-translate-y-[2px] border border-black w-4 h-4 text-black focus:ring-0"
                                        v-model="searchInProducts" /> <label class="whitespace-nowrap lg:text-xl"
                                        for="search-in-products">{{
                                            $t('search-in-products') }}</label>
                                </div>
                                <div class="flex items-center justify-start gap-2 lg:mx-10">
                                    <input id="search-in-inspirations" type="checkbox" name="item"
                                        class="lg:-translate-y-[2px] border border-black w-4 h-4 text-black focus:ring-0"
                                        v-model="searchInInspirations" /> <label class="whitespace-nowrap lg:text-xl"
                                        for="search-in-inspirations">{{
                                            $t('search-in-inspirations') }}</label>
                                </div>

                                <div
                                    class="flex items-center justify-between border border-gray-1 px-2 py-1 w-full lg:max-w-[480px] lg:mr-2">
                                    <input class="p-2 outline-none border-0 focus:ring-0" name="search" type="text"
                                        v-model="searchQuery" :placeholder="$t('what-are-you-looking-for')"
                                        @keydown="(event) => { if (event.keyCode === 13) search() }">
                                    <img width="16" height="16" class="w-4 h-4 gray-1-filter"
                                        src="@/assets/icons/search.svg" alt="">
                                </div>

                                <span class="w-full lg:w-auto">
                                    <LazyButtonsTransparent :label="$t('search')" type="button" tag-type="button"
                                        @click="search" />
                                </span>
                            </div>
                        </div>

                        <div class="lg:w-full lg:flex lg:items-center lg:gap-10 lg:justify-end">
                            <p class="hidden lg:block lg:text-xl">{{ $t('header-search-message') }}</p>
                            <span class="lg:hidden">
                                <LazyButtonsTransparent :label="$t('products')" :url="localePath({ name: 'products' })"
                                    tag-type="link" />
                            </span>
                            <span class="hidden lg:block">
                                <LazyButtonsTransparent :label="$t('go-to-products')"
                                    :url="localePath({ name: 'products' })" tag-type="link" />
                            </span>
                        </div>
                    </div>
                </div>
            </LazySectionsHeaderItem>

            <LazySectionsHeaderItem slug="clipboard" :icon="clipboardIcon">
                <div class="header__products left-0">
                    <div v-if="clipboardStore.hasItems" v-for=" clipboardItem in clipboardStore.items "
                        class="px-6 flex flex-col items-center gap-2 lg:mt-10">
                        <img class="aspect-[3/4]" width="390" height="520" :src="clipboardItem.image"
                            :alt="clipboardItem.symbol" :title="clipboardItem.symbol">
                        <div class="w-full flex flex-col items-start text-left text-xs gap-1.5 lg:pb-10">
                            <NuxtLink :to="localePath({ name: 'products' }) + `/${clipboardItem.slug}`"
                                :aria-label="clipboardItem.symbol" class="text-base font-bold">{{
                                    clipboardItem.collection }}
                            </NuxtLink>
                            <div class="flex justify-between gap-10 w-full">
                                <p class="text-gray-3">{{ clipboardItem.category }}</p>
                                <button @click="clipboardStore.toggleItem(clipboardItem.variant_id)"
                                    :aria-label="clipboardItem.symbol">
                                    <img src="/assets/icons/delete.svg" width="12" height="12" alt="" />
                                </button>
                            </div>
                            <p>{{ clipboardItem.symbol }}</p>
                            <p>{{ clipboardItem.catalog_dimensions }}</p>
                            <p>{{ clipboardItem.price }}</p>
                        </div>
                    </div>
                    <div v-else
                        class="flex lg:h-[300px] justify-center items-center lg:col-span-5 lg:text-4xl font-medium">
                        {{ $t('no-saved-products') }}
                    </div>
                </div>
            </LazySectionsHeaderItem>

            <div class="w-full justify-center flex lg:w-fit lg:justify-start">
                <NuxtLink :to="localePath('place-to-buy')" :aria-label="$t('place-to-buy')"
                    class="!text-white uppercase bg-black-2 text-medium-lg w-fit whitespace-nowrap px-2 flex items-center justify-center rounded-br-[15px] z-10 xl:w-[150px] 2xl:text-xl 2xl:py-2">
                    {{ $t('place-to-buy') }}</NuxtLink>
            </div>
        </div>

        <LazyFlashMessages />
    </div>
</template>

<script setup lang="ts">
import searchIcon from '@/assets/icons/search.svg';
import clipboardIcon from '@/assets/icons/clipboard.svg';
import type { LocationQueryRaw } from 'vue-router';

const clipboardStore = useClipboardStore();
const localePath = useLocalePath();
const headerStore = useHeaderStore();
const globalStore = useGlobalStore();
const route = useRoute();

const { header } = toRefs(globalStore);

const columns = computed(() => Object.groupBy([header?.value?.products.items['made-to-measure'], ...header?.value?.products.items.categories, header?.value?.products.items.collections], ({ menu_column }) => menu_column));
const categories: Ref = ref([]);

const getLink = (item: any, subitem: any) => {

    if (subitem.path) return subitem.path;
    if (!subitem.parameters) return localePath({ name: 'categories' }) + `/${subitem.slug}`;
    if (subitem.parameters) return `${item.type === 'collections' ? localePath({ name: 'categories' }) : item.url}?${Object.keys(subitem.parameters).map(key => Object.values(subitem.parameters[key]).map(id => `${key}[]=${id}`)).flat().join('&')}`

}

const getMainLink = (item: any) => {
    if (item.type === 'made-to-measure') return localePath({ name: 'made-to-measure' });
    if (item.type === 'collections') return localePath({ name: 'collections' });
    return localePath({ name: 'categories' }) + `/${item.slug}`;
}

Object.values(columns.value).map(column => {
    column?.map(item => {
        categories.value.push({
            'name': item.name,
            'path': item.slug ? localePath({ name: 'categories' }) + `/${item.slug}` : slugify(item.name),
            'image': item.image,
        });
    })
});

const searchQuery = ref('');
const searchInProducts = ref(false);
const searchInInspirations = ref(false);

const search = () => {
    const query = {
        search: searchQuery.value,
        searchInProducts: searchInProducts.value,
        searchInInspirations: searchInInspirations.value,
    }

    navigateTo(localePath({ name: 'search', query: (Object.fromEntries(Object.entries(query).filter(([, value]) => value !== false))) as LocationQueryRaw }));
}

const headerMenuRef = ref();

onMounted(async () => {
    const navObserver = new IntersectionObserver((entries) => {
        headerMenuRef.value?.classList.toggle('top-0', !entries[0].isIntersecting);
        headerMenuRef.value?.classList.toggle('drop-shadow-sm', !entries[0].isIntersecting);
    });

    navObserver.observe(document.getElementById('top-bar') as Element);

    document.addEventListener('scroll', () => headerStore.setSubmenu(''));

    await clipboardStore.fetchItems();

    searchQuery.value = (route.query.search ?? '') as string;
    searchInInspirations.value = (route.query.searchInInspirations ?? false) as boolean;
    searchInProducts.value = (route.query.searchInProducts ?? false) as boolean;
});
</script>