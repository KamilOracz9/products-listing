<template>
    <li class="text-medium-lg border-b border-opacity-50 border-white pb-1 lg:pb-0 lg:border-none">
        <p class="uppercase lg:pb-2" @click="footerStore.setActiveItem(slug)">{{ $t(slug) }}</p>
        <div :class="footerStore.isActive(slug) ? 'max-lg:active' : 'max-lg:inactive'"
            class="footer-item border-t border-opacity-50 border-white max-h-0 invisible flex flex-col lg:visible lg:max-h-fit lg:border-none">
            <NuxtLink v-for="link in items" class="text-normal-base hover-opacity-60 cursor-pointer transition-all"
                :to="getPath(link.slug)">{{ $t(link.slug) }}</NuxtLink>
        </div>
    </li>
</template>

<script setup>
import { useFooterStore } from '@/stores';

const footerStore = useFooterStore();
const localePath = useLocalePath();

const props = defineProps(['item']);

const { item: { slug, items } } = props;

const getPath = (linkSlug) => {
    let mainSlug = slug;

    if (linkSlug === 'service' || linkSlug === 'certified-installers') mainSlug = 'service';

    return localePath({ name: mainSlug }) + `#${linkSlug}`
}
</script>