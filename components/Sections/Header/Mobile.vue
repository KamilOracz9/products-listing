<template>
    <ul id="mobile-menu"
        :class="headerStore.menuIsOpen ? 'active pt-11 max-h-screen h-[calc(100vh-114px) xs:h-[calc(100vh-164px)]' : 'max-lg:inactive max-lg:max-h-0 lg:active'"
        class="lg:active lg:overflow-hidden lg:flex-row lg:h-auto header-menu max-lg:invisible flex flex-col items-end text-center gap-8 z-20 bg-white w-full h-[calc(100vh-82px)] overflow-y-auto lg:hidden">
        <SectionsHeaderDropdown :name="$t('products')">
            <li>
                <ul class="flex flex-wrap">
                    <li v-for="category in headerStore.mainCategories" class="w-[50%] md:w-[33%]">
                        <a :href="category.url" class="px-6 flex flex-col items-center gap-2">
                            <img width="60" :src="category.iconUrl" alt="">
                            {{ category.label }}
                        </a>
                    </li>
                </ul>
            </li>
        </SectionsHeaderDropdown>
        <SectionsHeaderDropdown :slug="menuItem.slug" :name="menuItem.label"
            v-for="menuItem in headerStore.headerMenu.items.filter(item => !item.type)">
            <li v-for="submenuItem in menuItem.items" :class="submenuItem.iconUrl ? 'w-[50%] md:w-[33%]' : 'w-full'">
                <a :href="submenuItem.url" v-if="!submenuItem.iconUrl">{{ submenuItem.label }}</a>
                <a :href="submenuItem.url" v-if="submenuItem.iconUrl" class="px-6 flex flex-col items-center gap-2">
                    <img width="60" :src="submenuItem.iconUrl" alt="">
                    {{ submenuItem.label }}
                </a>
            </li>
        </SectionsHeaderDropdown>

        <SectionsHeaderDropdown :name="$t('download')" url="/" :iconUrl="downloadIcon" :desktopLabelHide="true">
        </SectionsHeaderDropdown>
        <SectionsHeaderDropdown :name="$t('search')" :iconUrl="searchIcon" slug="wyszukaj" :desktopLabelHide="true">
            <li class="w-full flex justify-center">
                <div class="w-[70%] flex flex-col gap-4 py-4">
                    <div class="flex items-center justify-between border-2 border-gray-1 px-2 py-1">
                        <input class="p-2 outline-none" type="text" :placeholder="$t('what-are-you-looking-for')">
                        <img width="16" height="16" class="w-4 h-4 gray-1-filter" :src="searchIcon" alt="">
                    </div>

                    <button
                        class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">{{
                            $t('search') }}
                        <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></button>

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

                    <a href="/"
                        class="flex border-2 items-center justify-center gap-3 text-[1.375rem] min-h-[50px] min-w-[162px] w-fit">{{
                            $t('products') }}
                        <img src="@/assets/icons/arrow.svg" class="rotate-[270deg]" alt=""></a>
                </div>
            </li>
        </SectionsHeaderDropdown>
        <SectionsHeaderDropdown :name="$t('clipboard')" :iconUrl="clipboardIcon" slug="schowek" :desktopLabelHide="true">
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
        </SectionsHeaderDropdown>

        <ButtonsPlaceToBuy :label="$t('place-to-buy')" routeName="place-to-buy" />
    </ul>
</template>

<script setup>
import downloadIcon from '@/assets/icons/download.svg';
import searchIcon from '@/assets/icons/search.svg';
import clipboardIcon from '@/assets/icons/clipboard.svg';

const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();
</script>