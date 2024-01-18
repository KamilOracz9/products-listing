<template>
    <!-- <li class="menu-item font-medium text-[1.125rem] uppercase flex flex-col items-center w-full gap-2 lg:w-fit">
        <template v-if="hasSlot('default')">
            <div @click="handleOpen" class="flex items-center gap-2">
                <img class="min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px]" width="18" v-if="iconUrl" :src="iconUrl"
                    alt="">
                <span class="flex h-[18px]" :class="desktopLabelHide ? 'lg:hidden xl:flex' : ''">{{ name }}</span>
            </div>

            <div class="absolute submenu bg-white invisible top-full w-full">
                <ul :id="slug"
                    class="header-dropdown font-normal text-base flex flex-row flex-wrap gap-y-2 mt-2 invisible overflow-hidden w-full justify-start"
                    :class="headerStore.submenu === name ? 'active' : 'inactive'">
                    <slot />
                </ul>
            </div>
        </template>

        <a :href="url" v-if="!hasSlot('default')" class="flex items-center gap-2 pb-2 lg:pb-0">
            <img class="min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px]" width="18" v-if="iconUrl" :src="iconUrl"
                alt="">
            <span class="flex h-[18px]" :class="desktopLabelHide ? 'lg:hidden xl:flex' : ''">{{ name }}</span>
        </a>
    </li> -->
    <li class="menu-item font-medium text-[1.125rem] uppercase" @mouseleave="handleClose" :class="type === 'download' ? 'ml-auto' : ''">
        <a href="/" @mouseenter="handleOpen"
            class="pb-1 border-b border-black border-opacity-0 transition-all flex gap-2 hover:opacity-[60%] hover:border-opacity-[60%]">
            <img width="18" class="max-w-[18px] min-w-[18px] max-h-[18px] min-h-[18px]" src="@/assets/icons/download.svg"
                v-if="type === 'download'" alt="">
            <img width="18" class="max-w-[18px] min-w-[18px] max-h-[18px] min-h-[18px]" src="@/assets/icons/search.svg"
                v-if="type === 'search'" alt="">
            <img width="18" class="max-w-[18px] min-w-[18px] max-h-[18px] min-h-[18px]" src="@/assets/icons/clipboard.svg"
                v-if="type === 'clipboard'" alt="">
            {{ name }}
        </a>
        <div :class="headerStore.submenu === name ? 'visible' : 'invisible', type ? 'left-0 w-full' : ''"
            class="absolute submenu bg-white top-full">
            <template v-if="!type">
                <ul class="flex flex-col gap-4">
                    <slot />
                </ul>
            </template>
            <template v-if="type === 'products'">
                <ul class="grid grid-cols-7 px-[50px] [&>*:nth-child(7n)]:border-r-0">
                    <slot />
                </ul>
            </template>
            <template v-if="type === 'search'">
                <div class="w-full px-[50px] flex flex-wrap gap-y-8 font-normal">
                    <div class="flex items-center justify-between border-2 border-gray-1 px-2 py-1 w-1/3 mr-8">
                        <input class="p-2 outline-none w-full" type="text" placeholder="Napisz czego szukasz">
                        <img width="16" height="16" class="w-4 h-4 gray-1-filter" src="@/assets/icons/search.svg" alt="">
                    </div>

                    <button
                        class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit mr-20">Szukaj
                        <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></button>

                    <div class="flex items-center justify-start gap-2 mr-8">
                        <input id="search-in-products" type="checkbox" name="search-in-products" /> <label
                            for="search-in-products" class="translate-y-[2px] normal-case">Szukaj w produktach</label>
                    </div>
                    <div class="flex items-center justify-start gap-2 mr-8">
                        <input id="search-in-files" type="checkbox" name="search-in-files" /> <label for="search-in-files"
                            class="translate-y-[2px] normal-case">Szukaj w plikach</label>
                    </div>
                    <div class="flex items-center justify-start gap-2 mr-8">
                        <input id="search-in-inspirations" type="checkbox" name="search-in-inspirations" />
                        <label for="search-in-inspirations" class="translate-y-[2px] normal-case">Szukaj w
                            inspiracjach</label>
                    </div>

                    <div class="h-[50px] flex items-center normal-case w-1/3 mr-8">
                        Chcesz precyzyjnie wyszukać produkt po jego właściwościach?
                    </div>

                    <a href="/"
                        class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit px-4">Przejdź
                        do strony z produktami
                        <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></a>
                </div>
            </template>
            <template v-if="type === 'clipboard'">
                <ul class="grid grid-cols-4 px-[50px] xl:grid-cols-6">
                    <li v-for="clipboardItem in clipboardStore.items.products">
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
                </ul>
            </template>
        </div>
    </li>
</template>

<script setup>
import { useHeaderStore } from '~/stores/headerStore';
import { useClipboardStore } from '~/stores/clipboardStore';

const props = defineProps(['name', 'url', 'iconUrl', 'slug', 'desktopLabelHide', 'background', 'type']);
const { name, url, iconUrl, slug, desktopLabelHide, background, type } = props;

const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();

const slots = useSlots();

// const hasSlot = (name) => {
//     return !!slots[name];
// }

// const handleOpen = () => {
//     headerStore.setSubmenu(name);
//     background.style.height = event.target.closest('.menu-item').querySelector('.submenu').offsetHeight + 80 + 'px';
// }

const handleOpen = () => {
    headerStore.setSubmenu(name, false);

    const submenuHeight = event.target.closest('.menu-item').querySelector('.submenu').offsetHeight;

    if (submenuHeight) background.style.height = submenuHeight + 32 + 'px';
    else background.style.height = 0;
}
</script>