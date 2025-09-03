<template>
    <div ref="headerMenuRef" class="full-width content-grid">
        <div class="grid-content">
            <div class="flex justify-between w-full relative flex-col lg:flex-row">
                <SectionsHeaderLogo />

                <div class="header__items" :data-active="headerStore.menuIsOpen" :key="headerStore.submenu">
                    <SectionsHeaderItem :name="headerItem.name" :slug="slugify(headerItem.name)"
                        :position="headerItem.columns ? null : 'sticky'" v-for="headerItem in header">
                        <div v-if="headerItem.columns" class="header__categories lg:[&_a]:!text-left">
                            <LazySectionsHeaderColumn class="lg:hidden">
                                <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    <NuxtLink class="text-center flex items-center flex-col" :to="item.path"
                                        :title="item.name" :aria-label="item.name"
                                        v-for="item in headerItem.columns.flat()">
                                        <img loading="lazy" width="65" height="65" class="size-[65px]"
                                            :src="item.image ?? ''" :alt="item.name" :title="item.name" />
                                        <p class="py-3">{{ item.name }}</p>
                                    </NuxtLink>
                                </div>
                            </LazySectionsHeaderColumn>

                            <LazySectionsHeaderColumn v-for="(column, index) in headerItem.columns"
                                class="hidden lg:block">
                                <div class="lg:px-8 lg:mb-10" v-for="item in column">
                                    <NuxtLink
                                        :to="decodeURI(`${item.path}${item.query ? '?' + item.query : ''}${item.hash ?? ''}`)"
                                        :title="item.name" :aria-label="item.name">
                                        <img loading="lazy" width="65" height="65" class="size-[65px]"
                                            :src="item.image ?? ''" :alt="item.name" :title="item.name" />
                                        <p class="py-3">{{ item.name }}</p>
                                    </NuxtLink>
                                    <div class="text-sm" v-for="subitem in item.items">
                                        <a v-if="hasMoreThenOneFilter(subitem.query)" class="cursor-pointer"
                                            v-on:click="navigateTo(decodeURI(`${subitem.path}${subitem.query ? '?' + subitem.query : ''}${subitem.hash ?? ''}`))"
                                            :title="subitem.name" :aria-label="subitem.name">
                                            {{ subitem.name }}</a>
                                        <NuxtLink v-else
                                            :to="decodeURI(`${subitem.path}${subitem.query ? '?' + subitem.query : ''}${subitem.hash ?? ''}`)"
                                            :title="subitem.name" :aria-label="subitem.name">
                                            {{ subitem.name }}</NuxtLink>

                                        <div class="text-[0.8125rem] my-2 ml-2"
                                            v-if="subitem.items ? !!subitem.items.length : false">
                                            <a v-for="subsubitem in subitem.items" :aria-label="subitem.name"
                                                :title="subitem.name" class="cursor-pointer"
                                                v-on:click="router.push(decodeURI(`${subsubitem.path}${subsubitem.query ? '?' + subsubitem.query : ''}${subsubitem.hash ?? ''}`))">
                                                {{ subsubitem.name }}</a>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="index === headerItem.columns.length - 1" class="lg:px-8 lg:mb-10 flex flex-col gap-4">
                                    <NuxtLink class=" p-4 bg-yellow-1 text-white w-max hover:!text-black"
                                        :to="localePath({ name: 'products' })" :title="$t('navigation.all-products')"
                                        :aria-label="$t('navigation.all-products')">
                                        {{ $t('navigation.all-products') }}
                                    </NuxtLink>
                                    <NuxtLink class=" p-4 bg-black text-white w-max hover:!text-black hover:bg-white border border-black"
                                        :to="localePath({ name: 'products' }) + `?${slugify($t('filters.is_new'))}=1`" :title="$t('navigation.new-products')"
                                        :aria-label="$t('navigation.new-products')">
                                        {{ $t('navigation.new-products') }}
                                    </NuxtLink>
                                </div>
                            </LazySectionsHeaderColumn>
                        </div>

                        <div v-else class="header__links-ref">
                            <div class="header__links">
                                <NuxtLink :external="false" v-for="item in headerItem.items"
                                    :to="decodeURI(`${item.path}${item.query ? '?' + item.query : ''}${item.hash ?? ''}`)"
                                    :title="item.name" :aria-label="item.name">
                                    {{ item.name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </SectionsHeaderItem>

                    <NuxtLink
                        class="header__label w-full flex justify-center mb-4 lg:w-fit gap-2 items-center lg:mx-4 lg:ml-auto lg:my-auto"
                        :to="localePath({ name: 'download' })" :aria-label="$t('download')" :title="$t('download')">
                        <img width="16" height="16" class="header__icon" src="@/assets/icons/download.svg"
                            :alt="$t('download')" :title="$t('download')">
                        <p class="lg:hidden xl:block">{{ $t('download') }}</p>
                    </NuxtLink>

                    <LazySectionsHeaderItem slug="search" :icon="searchIcon">
                        <div class="w-full flex justify-center left-0 [&_a]:border-black [&_button]:border-black">
                            <div
                                class="w-[90%] max-w-[1300px] flex flex-col gap-4 py-4 lg:pb-8 lg:flex-row lg:flex-wrap">
                                <div class="flex flex-col lg:flex-row lg:flex-wrap lg:ml-auto">
                                    <div class="flex gap-2 flex-wrap lg:flex-nowrap lg:flex-row">
                                        <div class="flex items-center justify-start gap-2">
                                            <input id="search-in-products" type="checkbox" name="item"
                                                class="lg:-translate-y-[2px] border border-black w-4 h-4 text-black focus:ring-0"
                                                v-model="searchInProducts" /> <label
                                                class="whitespace-nowrap lg:text-xl" for="search-in-products">{{
                                                    $t('search-in-products') }}</label>
                                        </div>
                                        <div class="flex items-center justify-start gap-2 lg:mx-10">
                                            <input id="search-in-inspirations" type="checkbox" name="item"
                                                class="lg:-translate-y-[2px] border border-black w-4 h-4 text-black focus:ring-0"
                                                v-model="searchInInspirations" /> <label
                                                class="whitespace-nowrap lg:text-xl" for="search-in-inspirations">{{
                                                    $t('search-in-inspirations') }}</label>
                                        </div>

                                        <div
                                            class="flex items-center justify-between border border-gray-1 pl-2 w-full lg:max-w-[480px] lg:mr-2">
                                            <input class="px-2 py-3 outline-none border-0 w-full focus:ring-0"
                                                name="search" type="text" v-model="searchQuery"
                                                :placeholder="$t('what-are-you-looking-for')"
                                                @keydown="(event) => { if (event.keyCode === 13) search() }">
                                            <button v-on:click="search()"
                                                class="flex justify-center items-center w-10 h-full">
                                                <img width="16" height="16" class="w-4 h-4 gray-1-filter"
                                                    :alt="$t('search')" :title="$t('search')"
                                                    src="@/assets/icons/search.svg">
                                            </button>
                                        </div>

                                        <span class="w-full lg:w-auto">
                                            <LazyButtonsTransparent :label="$t('search')" type="button"
                                                tag-type="button" @click="search" />
                                        </span>
                                    </div>
                                </div>

                                <div class="lg:w-full lg:flex lg:items-center lg:gap-10 lg:justify-end">
                                    <p class="hidden lg:block lg:text-xl">{{ $t('header-search-message') }}</p>
                                    <span class="lg:hidden">
                                        <LazyButtonsTransparent :label="$t('products')"
                                            :url="localePath({ name: 'products' })" tag-type="link" />
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
                        <template v-if="clipboardStore.hasItems">
                            <div>
                                <div class="header__clipboard left-0">
                                    <div v-for="clipboardItem in clipboardStore.items"
                                        class="pb-6 px-6 flex flex-col items-center gap-2 lg:mt-10">
                                        <!-- <div v-for="clipboardItem in clipboardStore.items"
                                    class="pb-28 px-6 flex flex-col items-center gap-2 min-w-full xs:min-w-[50%] xs:max-w-[50%] sm:min-w-[33%] sm:max-w-[33%] md:min-w-[25%] md:max-w-[25%] lg:min-w-[20%] lg:max-w-[20%] lg:mt-10"> -->
                                        <img class="aspect-[3/4] rounded-br-sm" width="390" height="520"
                                            :src="clipboardItem.image" :alt="clipboardItem.symbol"
                                            :title="clipboardItem.symbol">
                                        <div
                                            class="w-full flex flex-col items-start text-left text-xs gap-1.5 lg:pb-10">
                                            <NuxtLink
                                                :to="localePath({ name: 'product-slug', params: { slug: clipboardItem.slug } })"
                                                :aria-label="clipboardItem.symbol" :title="clipboardItem.symbol"
                                                class="text-base font-bold">{{
                                                    clipboardItem.collection }}
                                            </NuxtLink>
                                            <div class="flex justify-between gap-10 w-full">
                                                <p class="text-gray-3">{{ clipboardItem.category }}</p>
                                                <div class="grid grid-cols-[repeat(2,12px)] gap-4">
                                                    <button
                                                        @click="clipboardStore.toggleItem(clipboardItem.variant_id, locale)"
                                                        class="size-3" :aria-label="clipboardItem.symbol"
                                                        :title="clipboardItem.symbol">
                                                        <img class="" src="/assets/icons/delete.svg"
                                                            width="12" height="12"
                                                            :title="`${$t('header-clipboard-delete')}: ${clipboardItem.symbol}`"
                                                            :alt="`${$t('header-clipboard-delete')}: ${clipboardItem.symbol}`" />
                                                    </button>
                                                    <SectionsCommonGenerateProductCard
                                                        :productId="clipboardItem.product_id"
                                                        :variantId="clipboardItem.variant_id" />
                                                </div>
                                            </div>
                                            <p>{{ clipboardItem.symbol }}</p>
                                            <p>{{ clipboardItem.catalog_dimensions }}</p>
                                            <p v-if="!$isNewtrendyEU()">{{ clipboardItem.price }}</p>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" @click="clipboardStore.clear()"
                                    class="relative ml-auto my-10 px-6 pb-[11px] pt-[14px] border-black border flex gap-6 items-center bg-white hover:bg-black transition-all hover:text-white group/button">
                                    <p class="text-xl uppercase">{{ $t('header-clipboard-clear') }}</p>
                                    <img width="18" class="-translate-y-[3px] group-hover/button:white-filter"
                                        src="/assets/icons/delete.svg" :title="$t('header-clipboard-clear')"
                                        :alt="$t('header-clipboard-clear')">
                                </button>
                            </div>
                        </template>
                        <div v-else
                            class="flex lg:h-[300px] justify-center items-center lg:col-span-5 lg:text-4xl font-medium">
                            {{ $t('no-saved-products') }}
                        </div>

                    </LazySectionsHeaderItem>

                    <div class="w-full justify-center flex lg:w-fit lg:justify-start">
                        <NuxtLink :to="$getLocaleRoute('place-to-buy')" :aria-label="$t('place-to-buy')"
                            :title="$t('place-to-buy')"
                            class="!text-white uppercase bg-black-2 text-medium-lg w-fit whitespace-nowrap px-2 flex items-center justify-center rounded-br-[15px] z-10 xl:min-w-[150px] 2xl:text-xl 2xl:py-2">
                            {{ $t('place-to-buy') }}</NuxtLink>
                    </div>
                </div>
            </div>

            <LazyFlashMessages />
        </div>
    </div>
</template>

<script setup lang="ts">
import searchIcon from '@/assets/icons/search.svg';
import clipboardIcon from '@/assets/icons/clipboard.svg';
import type { LocationQueryRaw } from 'vue-router';
import type { Header } from '~/types/layout.types';

const props = defineProps<{
    data: Header;
}>();

const { data: header } = toRefs(props);

const clipboardStore = useClipboardStore();
const localePath = useLocalePath();
const headerStore = useHeaderStore();
const route = useRoute();
const router = useRouter();
const locale = ref(getLocaleIso());

const searchQuery = ref('');
const searchInProducts = ref(false);
const searchInInspirations = ref(false);

const hasMoreThenOneFilter = (query: any) => new URLSearchParams(query).size > 1;

const search = () => {
    const query = {
        search: searchQuery.value,
        searchInProducts: searchInProducts.value,
        searchInInspirations: searchInInspirations.value,
    }

    navigateTo(localePath({ name: 'search', query: (Object.fromEntries(Object.entries(query).filter(([, value]) => value !== false))) as LocationQueryRaw }));
}

const headerMenuRef = ref();

function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

onMounted(async () => {
    const navObserver = new IntersectionObserver((entries) => {
        headerMenuRef.value?.classList.toggle('top-0', !entries[0].isIntersecting);
        headerMenuRef.value?.classList.toggle('drop-shadow-sm', !entries[0].isIntersecting);
    });

    navObserver.observe(document.getElementById('top-bar') as Element);

    if (!iOS()) document.addEventListener('scroll', () => headerStore.setSubmenu(''));
    document.addEventListener('click', () => {
        if (!(event?.target as Element)?.closest('.header__items')) headerStore.setSubmenu('');
    })

    await clipboardStore.fetchItems(locale.value);

    searchQuery.value = (route.query.search ?? '') as string;
    searchInInspirations.value = (route.query.searchInInspirations ?? false) as boolean;
    searchInProducts.value = (route.query.searchInProducts ?? false) as boolean;
});
</script>