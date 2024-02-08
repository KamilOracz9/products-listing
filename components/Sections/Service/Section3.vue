<template>
    <section class="mt-6 grid gap-4 md:grid-cols-2 md:gap-10">
        <ul class="flex flex-col gap-4 md:gap-10">
            <li v-for="(item, index) in left.items" :key="index">
                <div>
                    <p class="pb-2 text-[1.25rem] font-medium md:text-[1.5rem]">{{ item.title }}</p>
                    <p class="flex gap-2 items-center"><img src="@/assets/icons/phone.svg" class="size-[18px]" alt=""> {{
                        item.phones.join(` ${$t('or')} `) }}</p>
                    <p class="flex gap-2 items-center"><img src="@/assets/icons/clock.svg" class="size-[18px]" alt=""> {{
                        $t('pages.service.in-hours') }} {{ item.hours.open }} - {{ item.hours.close }}</p>
                </div>
            </li>
        </ul>

        <div>
            <picture>
                <source media="(1280px)" :srcset="right.image.desktop">
                <source media="(768px)" :srcset="right.image.mobile">
                <source media="(640px)" :srcset="right.image.desktop">
                <img :src="right.image.mobile" alt="">
            </picture>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IServiceSection3 } from "~/types/service";

const props = defineProps<{
    section: IServiceSection3
}>()

const { section: { left, right } } = props;
</script>