<template>
    <li class="text-medium-lg border-b border-opacity-50 border-white pb-1 lg:pb-0 lg:border-none">
        <p class="uppercase lg:pb-2" @click="footerStore.setActiveItem(slug)">{{ $t(slug) }}</p>
        <ul :class="footerStore.isActive(slug) ? 'max-lg:active' : 'max-lg:inactive'"
            class="footer-item border-t border-opacity-50 border-white max-h-0 invisible lg:visible lg:max-h-fit lg:border-none">
            <li v-for="link in items">
                <a class="text-normal-base hover-opacity-60 cursor-pointer transition-all" :href="link.url">{{ link.label }}</a>
            </li>
        </ul>
    </li>
</template>

<script setup>
import { useFooterStore } from '@/stores';

const footerStore = useFooterStore();

const props = defineProps(['item']);

const { item: { label, slug, items } } = props;
</script>