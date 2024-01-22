<template>
    <li :class="`menu-item-${slug}`"
        class="text-medium-lg uppercase flex flex-col items-center w-full gap-2 lg:w-fit">
        <template v-if="hasSlot('default')">
            <div @click="handleOpen" class="flex items-center gap-2">
                <img class="icon" width="18" v-if="iconUrl" :src="iconUrl"
                    alt="">
                <span class="flex h-[18px]" :class="desktopLabelHide ? 'lg:hidden xl:flex' : ''">{{ name }}</span>
            </div>
            <ul :id="slug"
                class="header-dropdown font-normal text-base flex flex-row flex-wrap gap-y-2 mt-2 invisible max-h-0 overflow-hidden w-full justify-start lg:hidden"
                :class="headerStore.submenu === name ? 'active' : 'inactive'">
                <slot />
            </ul>
        </template>

        <a :href="url" v-if="!hasSlot('default')" class="flex items-center gap-2 pb-2 lg:pb-0">
            <img class="icon" width="18" v-if="iconUrl" :src="iconUrl"
                alt="">
            <span class="flex h-[18px]" :class="desktopLabelHide ? 'lg:hidden xl:flex' : ''">{{ name }}</span>
        </a>
    </li>
</template>

<script setup>
import { useHeaderStore } from '~/stores';

const props = defineProps(['name', 'url', 'iconUrl', 'slug', 'desktopLabelHide']);
const { name, url, iconUrl, slug, desktopLabelHide } = props;

const headerStore = useHeaderStore();
const slots = useSlots();

const hasSlot = (name) => (!!slots[name]);

const handleOpen = () => headerStore.setSubmenu(name);
</script>