<template>
    <div class="py-7 flex flex-col fixed w-full bg-white lg:flex-row max-w-max-content"
        @mouseleave="() => { handleClose(); background.style.height = '0'; }">
        <ul class="px-5 flex justify-between items-center lg:mr-[70px]">
            <li>
                <a href="/"><img src="@/assets/images/logo.svg" width="161" alt=""></a>
            </li>

            <li class="lg:hidden">
                <button type="button" aria-label="Toggle menu" @click="headerStore.toggleMenuIsOpen()">
                    <div class="bg-gray-2 flex w-12 h-12 items-center justify-center">
                        <img src="@/assets/icons/burger-menu.svg" width="20" alt="" v-if="!headerStore.menuIsOpen">
                        <img src="@/assets/icons/close.svg" width="20" alt="" v-if="headerStore.menuIsOpen">
                    </div>
                </button>
            </li>
        </ul>

        <!-- Mobile menu -->
        <ul :class="headerStore.menuIsOpen ? 'active pt-11 max-h-screen h-[calc(100vh-114px) xs:h-[calc(100vh-164px)]' : 'max-lg:inactive max-lg:max-h-0 lg:active'"
            class="lg:active lg:overflow-hidden lg:flex-row lg:h-auto header-menu max-lg:invisible flex flex-col items-end text-center gap-8 z-20 bg-white w-full h-[calc(100vh-82px)] overflow-y-auto lg:hidden">
            <HeaderDropdown :slug="menuItem.slug" :name="menuItem.label" v-for="menuItem in headerStore.headerMenu.items">
                <li v-for="submenuItem in menuItem.items" :class="submenuItem.iconUrl ? 'w-[50%] md:w-[33%]' : 'w-full'">
                    <a :href="submenuItem.url" v-if="!submenuItem.iconUrl">{{ submenuItem.label }}</a>
                    <a :href="submenuItem.url" v-if="submenuItem.iconUrl" class="px-6 flex flex-col items-center gap-2">
                        <img width="60" :src="submenuItem.iconUrl" alt="">
                        {{ submenuItem.label }}
                    </a>
                </li>
            </HeaderDropdown>

            <HeaderDropdown name="Pobierz" url="/" :iconUrl="downloadIcon" :desktopLabelHide="true">
            </HeaderDropdown>
            <HeaderDropdown name="Wyszukaj" :iconUrl="searchIcon" slug="wyszukaj" :desktopLabelHide="true">
                <li class="w-full flex justify-center">
                    <div class="w-[70%] flex flex-col gap-4 py-4">
                        <div class="flex items-center justify-between border-2 border-gray-1 px-2 py-1">
                            <input class="p-2 outline-none" type="text" placeholder="Napisz czego szukasz">
                            <img width="16" height="16" class="w-4 h-4 gray-1-filter" :src="searchIcon" alt="">
                        </div>

                        <button
                            class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">Szukaj
                            <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></button>

                        <div class="flex items-center justify-start gap-2">
                            <input id="search-in-products" type="checkbox" name="search-in-products" /> <label
                                for="search-in-products">Szukaj w produktach</label>
                        </div>
                        <div class="flex items-center justify-start gap-2">
                            <input id="search-in-files" type="checkbox" name="search-in-files" /> <label
                                for="search-in-files">Szukaj w plikach</label>
                        </div>
                        <div class="flex items-center justify-start gap-2">
                            <input id="search-in-inspirations" type="checkbox" name="search-in-inspirations" />
                            <label for="search-in-inspirations">Szukaj w inspiracjach</label>
                        </div>

                        <a href="/"
                            class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">Produkty
                            <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></a>
                    </div>
                </li>
            </HeaderDropdown>
            <HeaderDropdown name="Schowek" :iconUrl="clipboardIcon" slug="schowek" :desktopLabelHide="true">
                <li v-for="clipboardItem in clipboardStore.items.products" class="w-[50%] md:w-[33%]">
                    <a :href="clipboardItem.url" class="px-6 flex flex-col items-center gap-2">
                        <img class="aspect-[3/4]" :src="clipboardItem.imgUrl" alt="">
                        <div class="w-full flex flex-col items-start text-left text-xs gap-1.5">
                            <p class="text-base font-bold">{{ clipboardItem.name }}</p>
                            <p class="text-gray-3">{{ clipboardItem.path }}</p>
                            <p>{{ clipboardItem.symbol }}</p>
                            <p>{{ clipboardItem.dimensions }}</p>
                            <p>{{ clipboardItem.price }}</p>
                        </div>
                    </a>
                </li>
            </HeaderDropdown>
        </ul>

        <!-- Desktop menu -->
        <ul class="hidden gap-6 items-end lg:flex w-full">
            <HeaderDropdownDesktop :slug="menuItem.slug" :name="menuItem.label" :background="background"
                :type="menuItem.type" v-for="menuItem in headerStore.headerMenu.items">
                <li v-for="submenuItem in menuItem.items" class="whitespace-nowrap" v-if="!menuItem.type">
                    <a :href="submenuItem.url" class="hover:opacity-[60%]">{{ submenuItem.label }}</a>
                </li>
                <li v-for="submenuItem in menuItem.items" v-if="menuItem.type === 'products'"
                    class="border-r border-gray-1">
                    <a :href="submenuItem.url" v-if="submenuItem.iconUrl" class="px-6 flex flex-col gap-2 flex-1">
                        <img width="60" :src="submenuItem.iconUrl" alt="">
                        <span class="hover:opacity-[60%]">{{ submenuItem.label }}</span>
                        <ul>
                            <li v-for="subcategory in submenuItem.items" class="text-sm">
                                <a :href="subcategory.url" class="hover:opacity-[60%]">{{ subcategory.label }}</a>
                            </li>
                        </ul>
                    </a>
                </li>
            </HeaderDropdownDesktop>

            <!-- <ul class="ml-auto flex items-cetner">
                <li class="pb-1 hover:opacity-[60%]">
                    <HeaderDropdownDesktop name="Pobierz" url="/" :iconUrl="downloadIcon" :desktopLabelHide="true">
                    </HeaderDropdownDesktop>
                </li>
                <HeaderDropdownDesktop name="Wyszukaj" :iconUrl="searchIcon" slug="wyszukaj" :desktopLabelHide="true"
                    type="search">
                    <li class="w-full flex justify-center">
                        <div class="w-[70%] flex flex-col gap-4 py-4">
                            <div class="flex items-center justify-between border-2 border-gray-1 px-2 py-1">
                                <input class="p-2 outline-none" type="text" placeholder="Napisz czego szukasz">
                                <img width="16" height="16" class="w-4 h-4 gray-1-filter" :src="searchIcon" alt="">
                            </div>

                            <button
                                class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">Szukaj
                                <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></button>

                            <div class="flex items-center justify-start gap-2">
                                <input id="search-in-products" type="checkbox" name="search-in-products" /> <label
                                    for="search-in-products">Szukaj w produktach</label>
                            </div>
                            <div class="flex items-center justify-start gap-2">
                                <input id="search-in-files" type="checkbox" name="search-in-files" /> <label
                                    for="search-in-files">Szukaj w plikach</label>
                            </div>
                            <div class="flex items-center justify-start gap-2">
                                <input id="search-in-inspirations" type="checkbox" name="search-in-inspirations" />
                                <label for="search-in-inspirations">Szukaj w inspiracjach</label>
                            </div>

                            <a href="/"
                                class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">Produkty
                                <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></a>
                        </div>
                    </li>
                </HeaderDropdownDesktop>
            </ul> -->
        </ul>

        <div ref="background" class="absolute bg-white w-full top-[calc(100%-1px)] rounded-b-[60px] -z-10"></div>
    </div>
</template>

<script setup>
import { useHeaderStore } from '~/stores/headerStore';
import { useClipboardStore } from '~/stores/clipboardStore';
import downloadIcon from '@/assets/icons/download.svg';
import searchIcon from '@/assets/icons/search.svg';
import clipboardIcon from '@/assets/icons/clipboard.svg';

const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();

const background = ref(null);

const handleClose = () => {
    headerStore.setSubmenu('');
}

onMounted(() => {
    headerStore.fetchMenuItems();
    clipboardStore.fetchItems();
});
</script>