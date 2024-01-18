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
    <li class="menu-item font-medium text-[1.125rem] uppercase" @mouseleave="handleClose">
        <a href="/" @mouseenter="handleOpen">{{ name }}</a>
        <div :class="headerStore.submenu === name ? 'visible' : 'invisible'" class="absolute submenu bg-white ">
            <ul class="mt-8 flex flex-col gap-4">
                <slot />
            </ul>
        </div>
    </li>
</template>

<script setup>
import { useHeaderStore } from '~/stores/headerStore';

const props = defineProps(['name', 'url', 'iconUrl', 'slug', 'desktopLabelHide', 'background']);
const { name, url, iconUrl, slug, desktopLabelHide, background } = props;

const headerStore = useHeaderStore();
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
    background.style.height = event.target.closest('.menu-item').querySelector('.submenu').offsetHeight + 'px';
}
</script>