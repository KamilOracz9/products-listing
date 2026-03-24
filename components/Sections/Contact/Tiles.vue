<template>
    <section class="mt-10">
        <ul class="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:gap-10">
            <li v-for="(tile, index) in data" :key="index" data-aos="fade-up" :id="tile.slug"
                class="bg-gray-2 rounded-br-[25px] p-6 font-medium text-lg items-center">
                <div class="flex gap-6 items-center lg:text-xl">
                    <img :src="tile.icon" class="h-[50px]" alt="">
                    <p>{{ tile.title }}</p>
                </div>
                <div class="flex items-center gap-2 py-4 lg:py-6">
                    <Arrow />
                    <span class="flex flex-1 h-0 border-b-2 border-black"></span>
                </div>
                <div class="font-normal text-base lg:text-[1.25rem] flex flex-col gap-1">
                    <!-- <a v-for="phone in tile.phone" :href="`tel:${phone}`">{{ $t('pages.contact.phone') }}: {{ phone
                    }}</a>
                    <a v-for="email in tile.email" :href="`mailto:${email}`">{{ email }}</a> -->

                    <template v-for="item in tile.items">
                        <template v-if="Array.isArray(item.phone) || Array.isArray(item.phone)">
                            <a v-for="phone in item.phone" :href="`tel:${phone}`">{{ $t('pages.contact.phone') }}: {{
                                phone }}</a>
                            <a v-for="email in item.email" :href="`mailto:${email}`">{{ email }}</a>
                        </template>

                        <template v-else>
                            <div class="flex flex-col gap-1 mb-2">
                                <a v-if="item.phone" :href="`tel:${item.phone}`">{{ $t('pages.contact.phone') }}: {{
                                    item.phone }}</a>
                                <a v-if="item.email" :href="`mailto:${item.email}`">{{ item.email }}</a>
                            </div>
                        </template>
                    </template>

                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import type { Department } from '@/types/contact.types.ts';

const props = defineProps<{ data: Department[] }>();
const { data } = toRefs(props);

console.log(data.value)
</script>