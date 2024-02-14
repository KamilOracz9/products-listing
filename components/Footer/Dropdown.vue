<template>
    <li class="text-medium-lg border-b border-opacity-50 border-white pb-1 lg:pb-0 lg:border-none">
        <p class="uppercase lg:pb-2" @click="footerStore.setActiveItem(item.slug)">{{ item.label ? $t(item.label) : $t(item.slug) }}</p>
        <div :class="footerStore.isActive(item.slug) ? 'max-lg:active' : 'max-lg:inactive'"
            class="footer-item border-t border-opacity-50 border-white max-h-0 invisible flex flex-col lg:visible lg:max-h-fit lg:border-none">
            <NuxtLink v-for="link in item.items" class="text-normal-base hover-opacity-60 cursor-pointer transition-all"
                :to="getPath(<string>link.slug)">{{ link.label ?? $t(<string>link.slug) }}</NuxtLink>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { IFooterItem } from '@/types/footer';
import { useFooterStore } from '@/stores';

const footerStore = useFooterStore();
const localePath = useLocalePath();

const props = withDefaults(defineProps<{
    divider?: '#' | '/',
    item: IFooterItem;
}>(), {
    divider: '#',
});

const { item, divider } = toRefs(props);

const getPath = (linkSlug: string) => {
    let mainSlug = item.value.slug;

    if (linkSlug === 'service' || linkSlug === 'certified-installers') mainSlug = 'service';

    return localePath({ name: mainSlug }) + `${divider.value}${linkSlug}`
}
</script>