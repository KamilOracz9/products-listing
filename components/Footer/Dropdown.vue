<template>
    <li class="footer__dropdown text-medium-lg border-b border-opacity-50 border-white pb-1 lg:pb-0 lg:border-none">
        <p class="uppercase lg:pb-2" @click="footerStore.setActiveItem(item.slug)">{{ item.label ? $t(item.label) :
            $t(item.slug) }}</p>
        <!-- <div :class="footerStore.isActive(item.slug) ? 'max-lg:active' : 'max-lg:inactive'"
            class="footer-item border-t border-opacity-50 border-white max-h-0 invisible flex flex-col lg:visible lg:max-h-fit lg:border-none">
            <NuxtLink v-for="link in item.items" class="text-normal-base hover-opacity-60 cursor-pointer transition-all"
                :to="getPath($t(<string>link.slug))">{{ link.label ?? $t(<string>link.slug) }}</NuxtLink>
        </div> -->
        <div :class="footerStore.isActive(item.slug) ? 'max-lg:active' : 'max-lg:inactive'">
            <div>
                <NuxtLink v-for="link in item.items" class="text-normal-base hover-opacity-60 cursor-pointer transition-all"
                    :to="getPath($t(<string>link.slug))">{{ link.label ?? $t(<string>link.slug) }}</NuxtLink>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { IFooterItem } from '@/types/footer';
import { useFooterStore } from '@/stores';
import slugify from '~/plugins/slugify';

const footerStore = useFooterStore();
const localePath = useLocalePath();
const i18n = useI18n();

const props = withDefaults(defineProps<{
    divider?: '#' | '/',
    item: IFooterItem;
    translate?: boolean;
}>(), {
    divider: '#',
    translate: true,
});

const { item, divider, translate } = toRefs(props);

const getPath = (linkSlug: string) => {
    let mainSlug = item.value.slug;

    if (linkSlug === i18n.t('service') || linkSlug === i18n.t('certified-installers')) mainSlug = 'service';

    if (linkSlug === i18n.t(mainSlug)) return localePath({ name: mainSlug });

    return localePath({ name: mainSlug }) + `${divider.value}${slugify(linkSlug)}`
}
</script>