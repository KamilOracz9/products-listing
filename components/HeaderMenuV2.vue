<template>
    <div ref="headerMenuRef" class="content-grid">

        <SectionsHeaderLogo />

        <div class="header__items" :data-active="headerStore.menuIsOpen" :key="headerStore.submenu">
            <SectionsHeaderItem slug="products">
                <div class="header__categories gap-10">
                    <NuxtLink :to="localePath({ name: 'made-to-measure' })">
                        <img loading="lazy" width="65" height="65" class="size-[65px]"
                            src="https://newtrendy.pl/app/uploads/2023/12/ikona-na-wymiar.png?ver=1701856289"
                            :alt="$t('navigation.made-to-measure')" :title="$t('navigation.made-to-measure')">
                        <p class="py-3">{{ $t('navigation.made-to-measure') }}</p>
                    </NuxtLink>

                    <NuxtLink v-for="category in categoryStore.mainCategories"
                        :to="localePath({ name: 'categories' }) + `/${category.slug}`">
                        <img loading="lazy" width="65" height="65" class="size-[65px]" :src="category.iconUrl"
                            :alt="category.label" :title="category.label">
                        <p class="py-3">{{ category.label }}</p>
                    </NuxtLink>

                    <NuxtLink :to="localePath({ name: 'collections' })">
                        <img loading="lazy" width="65" height="65" class="size-[65px]"
                            src="https://newtrendy.pl/app/uploads/2023/11/KABINY-WALK-IN-1.svg"
                            :alt="$t('navigation.collections')" :title="$t('navigation.collections')">
                        <p class="py-3">{{ $t('navigation.collections') }}</p>
                    </NuxtLink>
                </div>
                <div class="header__categories [&_a]:!text-left !hidden lg:!grid">
                    <SectionsHeaderColumn :column="categoryStore.list.items.columns[0]">
                        <div class="lg:px-8 lg:mb-10">
                            <NuxtLink :to="localePath({ name: 'made-to-measure' })">
                                <img loading="lazy" width="65" height="65" class="size-[65px]"
                                    src="https://newtrendy.pl/app/uploads/2023/12/ikona-na-wymiar.png?ver=1701856289"
                                    :alt="$t('navigation.made-to-measure')" :title="$t('navigation.made-to-measure')">
                                <p class="py-3">{{ $t('navigation.made-to-measure') }}</p>
                            </NuxtLink>
                            <div class="text-sm">
                                <NuxtLink
                                    v-for="item in ['measure', 'shape', 'glass', 'ceiling-bracket', 'walk-in-to-the-ceiling', 'installation-on-internal-cubes', 'rail-hanger',]"
                                    :to="{ path: localePath({ name: 'made-to-measure' }), hash: `#${slugify($t(`navigation.${item}`))}` }">
                                    {{ $t(`navigation.${item}`) }}</NuxtLink>
                            </div>
                        </div>
                    </SectionsHeaderColumn>
                    <SectionsHeaderColumn :column="categoryStore.list.items.columns[1]" />
                    <SectionsHeaderColumn :column="categoryStore.list.items.columns[2]" />
                    <SectionsHeaderColumn :column="categoryStore.list.items.columns[3]" />
                    <SectionsHeaderColumn>
                        <div class="lg:px-8 lg:mb-10">
                            <NuxtLink :to="localePath({ name: 'collections' })">
                                <img loading="lazy" width="65" height="65" class="size-[65px]"
                                    src="https://newtrendy.pl/app/uploads/2023/11/KABINY-WALK-IN-1.svg"
                                    :alt="$t('navigation.collections')" :title="$t('navigation.collections')">
                                <p class="py-3">{{ $t('navigation.collections') }}</p>
                            </NuxtLink>
                            <div class="text-sm">
                                <NuxtLink
                                    :to="{ path: localePath({ name: 'products' }), query: { collection: 'eventa' } }">
                                    Eventa</NuxtLink>
                                <NuxtLink
                                    :to="{ path: localePath({ name: 'products' }), query: { collection: 'eventa' } }">
                                    Eventa</NuxtLink>
                                <NuxtLink
                                    :to="{ path: localePath({ name: 'products' }), query: { collection: 'eventa' } }">
                                    Eventa</NuxtLink>
                                <NuxtLink
                                    :to="{ path: localePath({ name: 'products' }), query: { collection: 'eventa' } }">
                                    Eventa</NuxtLink>
                                <NuxtLink
                                    :to="{ path: localePath({ name: 'products' }), query: { collection: 'eventa' } }">
                                    Eventa</NuxtLink>
                                <NuxtLink
                                    :to="{ path: localePath({ name: 'products' }), query: { collection: 'eventa' } }">
                                    Eventa</NuxtLink>
                                <NuxtLink
                                    :to="{ path: localePath({ name: 'products' }), query: { collection: 'eventa' } }">
                                    Eventa</NuxtLink>
                            </div>
                        </div>
                    </SectionsHeaderColumn>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="inspirations">
                <div class="header__links-ref" ref="inspirationsRef">
                    <div class="header__links" :style="inspirationsStyle">
                        <NuxtLink :to="getPath('inspirations', $t('news'))">{{ $t('news') }}</NuxtLink>
                        <NuxtLink :to="getPath('inspirations', $t('arrangements-and-inspirations'))">{{
            $t('arrangements-and-inspirations') }}</NuxtLink>
                        <NuxtLink :to="getPath('inspirations', $t('advice-and-support'))">{{ $t('advice-and-support') }}
                        </NuxtLink>
                        <NuxtLink :to="getPath('inspirations', $t('faq'))">{{ $t('faq') }}</NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="for-professionals">
                <div class="header__links-ref" ref="forProfessionalsRef">
                    <div class="header__links" :style="forProfessionalsStyle">
                        <NuxtLink :to="getPath('for-professionals', $t('architects-zone'))">{{ $t('architects-zone') }}
                        </NuxtLink>
                        <NuxtLink :to="getPath('for-professionals', $t('partner-zone'))">{{ $t('partner-zone') }}
                        </NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="about">
                <div class="header__links-ref" ref="aboutRef">
                    <div class="header__links" :style="aboutStyle">
                        <NuxtLink :to="getPath('about', $t('companys-history'))">{{ $t('companys-history') }}</NuxtLink>
                        <NuxtLink :to="getPath('about', $t('awards-and-implementations'))">{{
            $t('awards-and-implementations') }}</NuxtLink>
                        <NuxtLink :to="getPath('about', $t('career'))">{{ $t('career') }}</NuxtLink>
                        <NuxtLink :to="getPath('about', $t('projects-ue'))">{{ $t('projects-ue') }}</NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <SectionsHeaderItem slug="contact">
                <div class="header__links-ref" ref="contactRef">
                    <div class="header__links" :style="contactStyle">
                        <NuxtLink :to="getPath('contact', $t('office'))">{{ $t('office') }}</NuxtLink>
                        <NuxtLink :to="getPath('contact', $t('sales-service-department'))">{{
            $t('sales-service-department') }}</NuxtLink>
                        <NuxtLink :to="getPath('contact', $t('export-department'))">{{ $t('export-department') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath({ name: 'service' })">{{ $t('service') }}</NuxtLink>
                        <NuxtLink :to="getPath('service', $t('certified-installers'))">{{ $t('certified-installers') }}
                        </NuxtLink>
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
                    <NuxtLink v-for=" clipboardItem  in  clipboardStore.items.products " :to="clipboardItem.url"
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
    </div>
</template>

<script setup lang="ts">
import slugify from '@/plugins/slugify';
import searchIcon from '@/assets/icons/search.svg';
import clipboardIcon from '@/assets/icons/clipboard.svg';

const route = useRoute();
const clipboardStore = useClipboardStore();
const localePath = useLocalePath();
const i18n = useI18n();
const categoryStore = useCategoryStore();
const headerStore = useHeaderStore();

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

const getPath = (mainSlug: string, linkSlug: string) => {
    if (linkSlug === i18n.t('service') || linkSlug === i18n.t('certified-installers')) mainSlug = 'service';

    if (linkSlug === i18n.t(mainSlug)) return localePath({ name: mainSlug });

    return localePath({ name: mainSlug }) + `#${slugify(linkSlug)}`;
}

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
    setHeader();

    await clipboardStore.fetchItems();

    document.addEventListener('scroll', onScroll);
    window.addEventListener('resize', setLeftOffsets);
});

onUnmounted(() => {
    document.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', setLeftOffsets);
})
</script>