<template>
    <div
        class="bg-black-2 text-white px-5 py-12 rounded-br-md lg:py-[61.5px] lg:pl-[46px] lg:pr-[78px] lg:rounded-br-lg">
        <!-- Items -->
        <ul class="footer__items">
            <FooterDropdown v-for="item in Object.values(top)" :translate="false" :item="item" />
        </ul>

        <ul
            class="flex w-full flex-col gap-y-7 mt-6 lg:mt-12 lg:flex-row lg:flex-wrap lg:gap-y-24 lg:border-t lg:border-opacity-50 lg:border-white lg:pt-12">
            <!-- Contacts -->
            <FooterContact v-for="item in [{
                title: bottom.company.title,
                address: [bottom.company.address],
                email: [bottom.company.email],
            }, ...bottom.departments]" :item="item" />
            <!-- Websites -->
            <li class="lg:w-1/4">
                <p class="text-medium-lg uppercase">{{ bottom.our_websites.title }}</p>
                <div class="flex mt-2 gap-3">
                    <img src="@/assets/icons/glob.svg" class="footer__icon" loading="lazy" width="16" height="16"
                        alt="Icon" title="" />
                    <div class="flex flex-col">
                       
                        <a v-for="item in bottom.our_websites.items" class="flex gap-3 footer__url" target="_blank" :href="`https://${item}`">{{ item }}</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Footer } from '~/types/layout.types';
const globalStore = useGlobalStore();

const { top, bottom } = toRefs(globalStore.footer as Footer);
</script>