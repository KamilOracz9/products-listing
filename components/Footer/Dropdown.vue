<template>
    <li class="footer__dropdown text-medium-lg border-b border-opacity-50 border-white pb-1 lg:pb-0 lg:border-none">
        <p class="uppercase lg:pb-2" @click="footerStore.setActiveItem(slugify(name))">{{ name }}</p>
        <div :class="footerStore.isActive(slugify(name)) ? 'max-lg:active' : 'max-lg:inactive'">
            <div>
                <NuxtLink v-for="item in items" class="text-normal-base hover-opacity-60 cursor-pointer transition-all"
                    :to="item.path ? `${item.path}${item.hash ?? ''}` : '#'" :aria-label="item.name">{{ item.name }}</NuxtLink>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { LayoutItem } from '~/types/layout.types';

const footerStore = useFooterStore();

const props = defineProps<{
    item: LayoutItem;
}>();

const { item } = toRefs(props);
const { name, items } = toRefs(item.value)
</script>