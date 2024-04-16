<template>
    <div ref="headerMenuRef" class="content-grid lg:top-0">

        <SectionsHeaderLogo />

        <div class="header__items" :data-active="headerStore.menuIsOpen" :key="headerStore.submenu">
            <SectionsHeaderItem slug="products">
                <div class="header__categories gap-10">
                    <NuxtLink v-for="category in categories" :to="category.path">
                        <img loading="lazy" width="65" height="65" class="size-[65px]" :src="category.image"
                            :alt="category.name" :title="category.name">
                        <p class="py-3">{{ category.name }}</p>
                    </NuxtLink>
                </div>
                <div class="header__categories [&_a]:!text-left !hidden lg:!grid">
                    <SectionsHeaderColumn v-for="column in columns">
                        <div class="lg:px-8 lg:mb-10" v-for="item in column">
                            <NuxtLink
                                :to="item.slug ? localePath({ name: 'categories' }) + `/${item.slug}` : slugify(item.name)">
                                <img loading="lazy" width="65" height="65" class="size-[65px]" :src="item.image"
                                    :alt="item.name" :title="item.name" />
                                <p class="py-3">{{ item.name }}</p>
                            </NuxtLink>
                            <div class="text-sm" v-for="subitem in item.items">
                                <NuxtLink 
                                    :to="localePath({ name: 'categories' }) + `/${item.slug}` + `?type[]=${subitem.slug}`">
                                    {{ subitem.name }}</NuxtLink>

                                <div class="text-xs my-2" v-if=" subitem.items ? !!subitem.items.length : false">
                                    <NuxtLink v-for="subsubitem in subitem.items"
                                        :to="localePath({ name: 'categories' }) + `/${item.slug}` + `?type[]=${subsubitem.slug}`">
                                        {{ subsubitem.name }}</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </SectionsHeaderColumn>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="inspirations">
                <div class="header__links-ref" ref="inspirationsRef">
                    <div class="header__links" :style="inspirationsStyle">
                        <NuxtLink v-for="item in header['inspirations'].items" :to="item.path">{{ item.label }}
                        </NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="for-professionals">
                <div class="header__links-ref" ref="forProfessionalsRef">
                    <div class="header__links" :style="forProfessionalsStyle">
                        <NuxtLink v-for="item in header['for-professionals'].items" :to="item.path">{{ item.label }}
                        </NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="about">
                <div class="header__links-ref" ref="aboutRef">
                    <div class="header__links" :style="aboutStyle">
                        <NuxtLink v-for="item in header['about-us'].items" :to="item.path">{{ item.label }}</NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="contact">
                <div class="header__links-ref" ref="contactRef">
                    <div class="header__links" :style="contactStyle">
                        <NuxtLink v-for="item in header['contact'].items" :to="item.path">{{ item.label }}</NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <NuxtLink
                class="header__label w-full flex justify-center mb-4 lg:w-fit gap-2 items-center lg:mx-4 lg:ml-auto lg:my-auto"
                :to="localePath({ name: 'download' })">
                <img width="16" height="16" class="header__icon" src="@/assets/icons/download.svg" alt="">
                <p class="lg:hidden 2xl:block">{{ $t('download') }}</p>
            </NuxtLink>

            <SectionsHeaderItem slug="search" :icon="searchIcon">
                <div class="w-full flex justify-center left-0 [&_a]:border-black [&_button]:border-black">
                    <div class="w-[90%] flex flex-col gap-4 py-4 lg:pb-8 lg:flex-row lg:flex-wrap">
                        <div class="flex items-center justify-between border border-gray-1 px-2 py-1 lg:w-[300px]">
                            <input class="p-2 outline-none border-0" name="search" type="text"
                                :placeholder="$t('what-are-you-looking-for')">
                            <img width="16" height="16" class="w-4 h-4 gray-1-filter" src="@/assets/icons/search.svg"
                                alt="">
                        </div>

                        <span class="lg:mr-20">
                            <ButtonsTransparent :label="$t('search')" type="submit" tag-type="button" />
                        </span>

                        <div class="flex gap-2 flex-wrap lg:flex-nowrap lg:flex-row lg:flex-1 justify-between">
                            <div class="flex items-center justify-start gap-2"
                                v-for="item in ['search-in-products', 'search-in-files', 'search-in-inspirations']">
                                <input :id="item" type="checkbox" name="item" class="lg:-translate-y-[2px]" /> <label
                                    class="whitespace-nowrap lg:text-xl" :for="item">{{
                                        $t(item) }}</label>
                            </div>
                        </div>

                        <div class="lg:w-full lg:flex lg:items-center lg:gap-10">
                            <p class="hidden lg:block lg:text-xl">{{ $t('header-search-message') }}</p>
                            <span class="lg:hidden">
                                <ButtonsTransparent :label="$t('products')" :url="localePath({ name: 'products' })"
                                    tag-type="link" />
                            </span>
                            <span class="hidden lg:block">
                                <ButtonsTransparent :label="$t('go-to-products')"
                                    :url="localePath({ name: 'products' })" tag-type="link" />
                            </span>
                        </div>
                    </div>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="clipboard" :icon="clipboardIcon">
                <div class="header__products left-0">
                    <NuxtLink v-for=" clipboardItem in clipboardStore.items.products " :to="clipboardItem.url"
                        class="px-6 flex flex-col items-center gap-2 lg:mt-10">
                        <img class="aspect-[3/4]" width="390" height="520" :src="clipboardItem.imgUrl"
                            :alt="clipboardItem.name" :title="clipboardItem.name">
                        <div class="w-full flex flex-col items-start text-left text-xs gap-1.5 lg:pb-10">
                            <p class="text-base font-bold">{{ clipboardItem.name }}</p>
                            <p class="text-gray-3">{{ clipboardItem.path }}</p>
                            <p>{{ clipboardItem.symbol }}</p>
                            <p>{{ clipboardItem.dimensions }}</p>
                            <p>{{ clipboardItem.price }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </SectionsHeaderItem>

            <div class="w-full justify-center flex lg:w-fit lg:justify-start">
                <NuxtLink :to="localePath('place-to-buy')"
                    class="!text-white uppercase bg-black-2 text-medium-lg w-fit whitespace-nowrap px-2 flex items-center justify-center rounded-br-[15px] z-10 xl:w-[150px] 2xl:text-xl 2xl:py-2">
                    {{ $t('place-to-buy') }}</NuxtLink>
            </div>
        </div>

        <FlashMessages />
    </div>
</template>

<script setup lang="ts">
import searchIcon from '@/assets/icons/search.svg';
import clipboardIcon from '@/assets/icons/clipboard.svg';

const clipboardStore = useClipboardStore();
const localePath = useLocalePath();
const headerStore = useHeaderStore();
const globalStore = useGlobalStore();

const { header } = toRefs(globalStore);

const columns = computed(() => Object.groupBy([header?.value?.products.items['made-to-measure'], ...header?.value?.products.items.categories, header?.value?.products.items.collections], ({ menu_column }) => menu_column));
const categories = ref([]);

Object.values(columns.value).map(column => {
    column?.map(item => {
        categories.value.push({
            'name': item.name,
            'path': item.slug ? localePath({ name: 'categories' }) + `/${item.slug}` : slugify(item.name),
            'image': item.image,
        });
    })
});

const headerMenuRef = ref();
const inspirationsRef = ref();
const forProfessionalsRef = ref();
const aboutRef = ref();
const contactRef = ref();

const inspirationsOffsetLeft = ref(0);
const inspirationsStyle = computed(() => ({
    translate: `${inspirationsOffsetLeft.value}px`,
}))

const forProfessionalsOffsetLeft = ref(0);
const forProfessionalsStyle = computed(() => ({
    translate: `${forProfessionalsOffsetLeft.value}px`,
}))

const aboutOffsetLeft = ref(0);
const aboutStyle = computed(() => ({
    translate: `${aboutOffsetLeft.value}px`,
}))

const contactOffsetLeft = ref(0);
const contactStyle = computed(() => ({
    translate: `${contactOffsetLeft.value}px`,
}))

const setHeader = () => {
    const shadow = 'drop-shadow-sm';

    if (window.scrollY) {
        headerMenuRef.value.classList.add(shadow);
        headerMenuRef.value.classList.add('lg:top-0');
    }
    else {
        headerMenuRef.value.classList.remove(shadow);
        headerMenuRef.value.classList.remove('lg:top-0');
    }
}

const onScroll = () => {
    setHeader();
}

const calcLeftOffset = (element: HTMLElement) => {
    const dropdown = element.closest('.header__dropdown') as HTMLElement;
    const headerLinks = element.querySelector('.header__links') as HTMLElement;

    return dropdown.offsetLeft - 16 + (dropdown.offsetWidth / 2) - (headerLinks.offsetWidth / 2);
}

const setLeftOffsets = () => {
    inspirationsOffsetLeft.value = calcLeftOffset(inspirationsRef.value);
    forProfessionalsOffsetLeft.value = calcLeftOffset(forProfessionalsRef.value);
    aboutOffsetLeft.value = calcLeftOffset(aboutRef.value);
    contactOffsetLeft.value = calcLeftOffset(contactRef.value);
}

watch(
    () => headerStore.submenu,
    () => {
        setLeftOffsets();
    },
)

onMounted(async () => {
    await clipboardStore.fetchItems();

    document.addEventListener('scroll', onScroll);
    window.addEventListener('resize', setLeftOffsets);

    setHeader();
});

onUnmounted(() => {
    document.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', setLeftOffsets);
})
</script>