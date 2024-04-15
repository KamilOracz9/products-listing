<template>
    <section class="mt-6 flex gap-4 flex-col md:flex-row md:gap-10">
        <ul class="flex flex-col gap-4 md:gap-10 md:w-1/2">
            <li v-for="(item, index) in left.items" :key="index">
                <div>
                    <p class="pb-2 text-[1.25rem] font-medium md:text-[1.5rem]">{{ item.title }}</p>
                    <p class="flex gap-2 items-center"><img src="@/assets/icons/phone.svg" class="size-[18px]" alt=""> {{ item.phone }}</p>
                    <p class="flex gap-2 items-center"><img src="@/assets/icons/clock.svg" class="size-[18px]" alt=""> {{ item.phone_hours }}</p>
                </div>
            </li>
        </ul>

        <div class="relative flex max-h-[374px] items-end md:w-1/2">
            <img :src="right.image" alt="" width="270" height="374" class="max-h-[200px] w-auto pl-4 z-10 md:max-h-[200px] xl:max-h-[374px]" />
            <div class="absolute bottom-0 w-full bg-gray-2 h-[70%] md:h-[45%] xl:h-[70%]">
                <p class="absolute top-1/2 -translate-y-1/2 left-[174px] font-semibold leading-[1.1] z-20 text-[clamp(.875rem,3cqw,2rem)] max-w-[400px] xl:left-[300px]">{{ right.text }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ContactItem } from "~/types/service.types";

const props = defineProps<{
    data: {
        left: {
            items: ContactItem[]
        };
        right: {
            image: string;
            text: string;
        };
    }
}>()

const { data } = toRefs(props);
const { left, right } = toRefs(data.value);
</script>