<template>
    <li class="menu-item text-medium-lg lg:text-base xl:text-xl uppercase" @mouseleave="handleClose"
        :class="type === 'download' ? 'ml-auto' : ''">
        <RouterLink :to="localePath({ name: slug })" @mouseenter="handleOpen"
            class="translate-y-2 pb-1 border-b border-black border-opacity-0 transition-all flex gap-2 hover-opacity-60">
            <img width="18" class="icon--header" src="@/assets/icons/download.svg" v-if="type === 'download'" alt="">
            <img width="18" class="icon--header" src="@/assets/icons/search.svg" v-if="type === 'search'" alt="">
            <img width="18" class="icon--header" src="@/assets/icons/clipboard.svg" v-if="type === 'clipboard'" alt="">
            <span :class="type === 'clipboard' || type === 'search' || type === 'download' ? 'lg:hidden 2xl:block' : ''">{{
                $t(slug) }}</span>
        </RouterLink>
        <div :class="headerStore.submenu === name ? 'visible' : 'invisible', type ? 'left-0 w-full' : ''"
            class="absolute submenu bg-white top-full text-base">
            <!-- Default -->
            <template v-if="!type">
                <ul class="flex flex-col gap-4">
                    <slot />
                </ul>
            </template>
            <!-- Products -->
            <template v-if="type === 'products'">
                <slot />
            </template>
            <!-- Search -->
            <template v-if="type === 'search'">
                <div class="w-full px-[50px] flex flex-wrap gap-y-8 font-normal">
                    <div class="flex items-center justify-between border-2 border-gray-1 px-2 py-1 w-1/3 mr-8">
                        <input class="p-2 outline-none w-full border-0" name="search" type="text" :placeholder="$t('what-are-you-looking-for')">
                        <img width="16" height="16" class="w-4 h-4 gray-1-filter" src="@/assets/icons/search.svg" alt="">
                    </div>

                    <button
                        class="flex border items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit mr-20 border-black">{{
                            $t('search') }}
                        <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></button>

                    <div class="flex items-center justify-start gap-2 mr-8">
                        <input id="search-in-products-desktop" type="checkbox" name="search-in-products-desktop" /> <label
                            for="search-in-products-desktop" class="translate-y-[2px] normal-case">{{ $t('search-in-products')
                            }}</label>
                    </div>
                    <div class="flex items-center justify-start gap-2 mr-8">
                        <input id="search-in-files-desktop" type="checkbox" name="search-in-files" /> <label for="search-in-files-desktop"
                            class="translate-y-[2px] normal-case">{{ $t('search-in-files') }}</label>
                    </div>
                    <div class="flex items-center justify-start gap-2 mr-8">
                        <input id="search-in-inspirations-desktop" type="checkbox" name="search-in-inspirations-desktop" />
                        <label for="search-in-inspirations-desktop" class="translate-y-[2px] normal-case">{{
                            $t('search-in-inspirations') }}</label>
                    </div>

                    <div class="h-[50px] text-lg flex items-center normal-case w-1/3 mr-8">{{ $t('header-search-message') }}
                    </div>

                    <a href="/"
                        class="flex border border-black items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit px-4">{{
                            $t('go-to-products') }}
                        <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></a>
                </div>
            </template>
            <!-- Clipboard -->
            <template v-if="type === 'clipboard'">
                <ul class="grid grid-cols-4 px-[50px] xl:grid-cols-6">
                    <li v-for="clipboardItem in clipboardStore.items.products">
                        <a :href="clipboardItem.url" class="px-6 flex flex-col items-center gap-2">
                            <img loading="lazy" class="aspect-[3/4]" width="390" height="520" :src="clipboardItem.imgUrl" :title="clipboardItem.name" :alt="clipboardItem.name">
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
import { useHeaderStore, useClipboardStore } from '~/stores';

const props = defineProps(['name', 'slug', 'background', 'type']);
const { name, background, type, slug } = props;

const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();
const localePath = useLocalePath();

const handleOpen = () => {
    headerStore.setSubmenu(name, false);

    const submenuHeight = event.target.closest('.menu-item').querySelector('.submenu').offsetHeight;

    if (submenuHeight) background.style.height = submenuHeight + 32 + 'px';
    else background.style.height = 0;
}
</script>