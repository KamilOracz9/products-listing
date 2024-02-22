<template>
    <div ref="headerMenuRef" class="content-grid">

        <SectionsHeaderLogo :toggleMenu="toggleMenu" />

        <div class="header__items" :data-active="isActive">
            <SectionsHeaderItem slug="products">
                <div class="header__categories">
                    <div v-for="column in categoryStore.list.items.columns">
                        <SectionsHeaderColumn :column="column" />
                        <!-- <div v-for="category in column.items" class="lg:my-10 lg:px-5">
                            <NuxtLink :to="localePath({ name: 'categories' }) + `/${category.slug}`">
                                <img loading="lazy" width="65" height="65" class="size-[65px]" :src="category.iconUrl"
                                    :alt="category.label" :title="category.label">
                                <p class="py-3">{{ category.label }}</p>
                            </NuxtLink>
                            <div class="text-sm" v-for="subcategory in category.items">
                                <NuxtLink class="text-left"
                                    :to="{ path: localePath({ name: 'categories' }) + `/${category.slug}`, query: { type: subcategory.slug } }">
                                    {{ subcategory.label }}</NuxtLink>
                                <ul class="pl-2 py-2" v-if="subcategory.items">
                                    <li v-for="subsubcategory in subcategory.items">
                                        <NuxtLink
                                            :to="{ path: localePath({ name: 'categories' }) + `/${category.slug}`, query: { type: subcategory.slug, doors: subsubcategory.slug } }">
                                            {{ subsubcategory.label }}</NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div> -->
                    </div>
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
                        <NuxtLink :to="getPath('for-professionals', $t('partner-zone'))">{{ $t('partner-zone') }}</NuxtLink>
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
                        <NuxtLink :to="getPath('contact', $t('export-department'))">{{ $t('export-department') }}</NuxtLink>
                        <NuxtLink :to="localePath({ name: 'service' })">{{ $t('service') }}</NuxtLink>
                        <NuxtLink :to="getPath('service', $t('certified-installers'))">{{ $t('certified-installers') }}
                        </NuxtLink>
                    </div>
                </div>
            </SectionsHeaderItem>

            <NuxtLink
                class="header__label w-full flex justify-center mb-4 lg:w-fit gap-2 items-center lg:ml-auto lg:my-auto"
                :to="localePath({ name: 'download' })">
                <img width="16" height="16" class="header__icon" src="@/assets/icons/download.svg" alt="">
                <p class="lg:hidden 2xl:block">{{ $t('download') }}</p>
            </NuxtLink>

            <div class="lg:my-auto">
                <p class="header__label flex gap-2 items-center" @click="toggleSubmenu('search')">
                    <img width="16" height="16" class="header__icon" src="@/assets/icons/search.svg" alt="">
                    <span class="mx-auto lg:hidden 2xl:block">{{ $t('search') }}</span>
                </p>
                <div class="header__dropdown" :data-active="activeSubmenu === 'search' ? true : false">
                    <div class="w-full flex justify-center left-0">
                        <div class="w-[70%] flex flex-col gap-4 py-4 lg:pb-8">
                            <div class="flex items-center justify-between border-2 border-gray-1 px-2 py-1">
                                <input class="p-2 outline-none border-0" name="search" type="text"
                                    :placeholder="$t('what-are-you-looking-for')">
                                <img width="16" height="16" class="w-4 h-4 gray-1-filter" src="@/assets/icons/search.svg"
                                    alt="">
                            </div>

                            <button
                                class="flex border border-black items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">{{
                                    $t('search') }}
                                <Arrow :direction="'right'" />
                            </button>

                            <div class="flex items-center justify-start gap-2">
                                <input id="search-in-products" type="checkbox" name="search-in-products" /> <label
                                    for="search-in-products">{{ $t('search-in-products') }}</label>
                            </div>
                            <div class="flex items-center justify-start gap-2">
                                <input id="search-in-files" type="checkbox" name="search-in-files" /> <label
                                    for="search-in-files">{{ $t('search-in-files') }}</label>
                            </div>
                            <div class="flex items-center justify-start gap-2">
                                <input id="search-in-inspirations" type="checkbox" name="search-in-inspirations" />
                                <label for="search-in-inspirations">{{ $t('search-in-inspirations') }}</label>
                            </div>

                            <NuxtLink to="/"
                                class="flex border border-black items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">
                                {{ $t('products') }}
                                <Arrow :direction="'right'" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:my-auto">
                <p class="header__label flex gap-2 items-center" @click="toggleSubmenu('clipboard')">
                    <img width="16" height="16" class="header__icon" src="@/assets/icons/clipboard.svg" alt="">
                    <span class="mx-auto lg:hidden 2xl:block">{{ $t('clipboard') }}</span>
                </p>
                <div class="header__dropdown" :data-active="activeSubmenu === 'clipboard' ? true : false">
                    <div class="header__products left-0">
                        <NuxtLink v-for="clipboardItem in clipboardStore.items.products" :to="clipboardItem.url"
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
                </div>
            </div>

            <div class="w-full justify-center flex lg:w-fit lg:justify-start">
                <NuxtLink :to="localePath('place-to-buy')"
                    class="text-white uppercase bg-black-2 text-medium-lg w-fit whitespace-nowrap px-2 flex items-center justify-center rounded-br-[15px] z-10 xl:w-[150px] 2xl:text-xl 2xl:py-2">
                    {{ $t('place-to-buy') }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import slugify from '@/plugins/slugify';

const clipboardStore = useClipboardStore();
const localePath = useLocalePath();
const i18n = useI18n();

const categoryStore = useCategoryStore();

const headerMenuRef = ref();
const inspirationsRef = ref();
const forProfessionalsRef = ref();
const aboutRef = ref();
const contactRef = ref();

const isActive = ref(true);
const activeSubmenu = ref('');

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

const toggleMenu = () => isActive.value = !isActive.value;
const toggleSubmenu = (submenu: string) => activeSubmenu.value = activeSubmenu.value === submenu ? '' : submenu;

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

provide('activeSubmenu', activeSubmenu);
provide('toggleSubmenu', toggleSubmenu);

onMounted(async () => {
    setHeader();

    await clipboardStore.fetchItems();

    document.addEventListener('scroll', onScroll);
    window.addEventListener('resize', setLeftOffsets);

    setLeftOffsets();
});

onUnmounted(() => {
    document.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', setLeftOffsets);
})
</script>