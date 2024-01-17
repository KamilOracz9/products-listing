<template>
    <li class="font-medium text-[1.125rem] uppercase flex flex-col items-center w-full gap-2">
        <template v-if="hasSlot('default')">
            <div @click="handleOpen" class="flex items-center gap-2">
                <img class="w-[18px] h-[18px]" width="18" v-if="iconUrl" :src="iconUrl" alt="">
                <span class="flex h-[18px]">{{ name }}</span>
            </div>
            <ul :id="slug"
                class="header-dropdown font-normal text-base flex flex-row flex-wrap gap-y-2 mt-2 invisible max-h-0 overflow-hidden w-full justify-start"
                :class="headerStore.submenu === name ? 'active' : 'inactive'">
                <slot />
            </ul>
        </template>

        <a :href="url" v-if="!hasSlot('default')" class="flex items-center gap-2 pb-4">
            <img class="w-[18px] h-[18px]" width="18" v-if="iconUrl" :src="iconUrl" alt="">
            <span class="flex h-[18px]">{{ name }}</span>
        </a>
    </li>
</template>

<script setup>
import { useHeaderStore } from '~/stores/headerStore';

const props = defineProps(['name', 'url', 'iconUrl', 'slug']);
const { name, url, iconUrl, slug } = props;

const headerStore = useHeaderStore();
const slots = useSlots();

const hasSlot = (name) => {
    return !!slots[name];
}

const handleOpen = () => {
    headerStore.setSubmenu(name);
    if (headerStore.submenu === name) {
        // const element = document.getElementById(slug);

        // console.log(document.querySelector('.header-menu').scrollTop = 200)

        // document.querySelector('.header-menu').scrollTo({
        //     top: 200,
        //     behavior: "smooth"
        // });
    }
}
</script>