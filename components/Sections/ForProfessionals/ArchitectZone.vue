<template>
    <section class="mb-20" :id="slugify($t('architects-zone'))">
        <p class="section-title">{{ title }}</p>

        <section class="for-professionas-section mb-10">
            <div class="section-text grid gap-4 lg:my-0" data-aos="fade-up" v-html="section_1.left.text"></div>

            <div data-aos="fade-up" class="my-4 grid gap-2 lg:my-0">
                <p class="font-medium text-xl sm:text-2xl">{{ section_1.right.title }}</p>

                <div v-html="section_1.right.text" class="section-text"></div>
            </div>
        </section>

        <div class="for-professionas-section">
            <section class="bg-gray-5 pt-5 mb-6 lg:mb-0">
                <div class="px-5 sm:px-7 sm:pt-5" data-aos="fade-up">
                    <p class="font-medium text-lg mb-2 sm:text-xl">{{ section_2.left.title }}</p>

                    <ul class="mb-auto pl-6 flex flex-col gap-1 sm:text-lg">
                        <li class="list-disc" v-for="(item, index) in section_2.left.items" :key="index">{{ item }}
                        </li>
                    </ul>
                </div>

                <div class="bg-yellow-2 p-8 rounded-tl-[25px] mt-6 text-lg lg:text-xl 2xl:w-[calc(50%-1.25rem)] 2xl:ml-auto"
                    data-aos="fade-up">
                    <ul class="flex flex-col gap-6" style="font-size: clamp(1rem, 3cqw, 1.25rem);">
                        <div class="flex gap-4 items-center" v-if="section_2.left.person">
                            <img class="w-[28px] aspect-[1/1]"src="@/assets/icons/person.svg" alt=""> {{ section_2.left.person }}
                        </div>
                        <a class="flex gap-4 items-center" :href="`tel:${section_2.left.phone}`"><img class="w-[28px] aspect-[1/1]"
                                src="@/assets/icons/phone.svg" alt=""> {{ section_2.left.phone }}</a>
                        <a class="flex gap-4 items-center" :href="`mailto:${section_2.left.email}`"><img class="w-[28px] aspect-[1/1]"
                                src="@/assets/icons/envelope.svg" alt=""> {{ section_2.left.email }}</a>
                    </ul>
                </div>
            </section>

            <section data-aos="fade-up">
                <div class="h-[335px] relative mb-6 lg:mt-0 lg:h-full">
                    <picture>
                        <source media="(min-width: 1024px)" :srcset="section_2.right.image.desktop">
                        <source media="(min-width: 450px)" :srcset="section_2.right.image.tablet">
                        <img :src="section_2.right.image.mobile" alt="" class="w-full h-full object-cover rounded-tr-[25px]">
                    </picture>
                    <div
                        class="absolute bottom-0 left-0 p-5 flex flex-col gap-5 text-white [&>a>img]:white-filter [&>a]:w-fit">
                        <p class="text-[1.25rem] font-medium">{{ section_2.right.title }}</p>
                        <ButtonsTransparent tagType="link" class="border-white" :label="section_2.right.button"
                            :url="section_2.right.path" />
                    </div>
                </div>
            </section>
        </div>

        <div class="grid gap-6 lg:gap-10 lg:mt-10 xl:grid-cols-2">
            <section class="sm:grid sm:gap-6 sm:grid-cols-2 lg:gap-10 lg:mt-0 2xl:grid-cols-2">
                <SectionsCommonBox boxClass="bg-gray-5 lg:order-1 xl:-order-1" :box="section_3.box_1" target="_blank" />
                <SectionsCommonBox boxClass="bg-yellow-2 rounded-br-[25px] mt-6 md:rounded-br-lg sm:mt-0"
                    :box="section_3.box_2" />
            </section>

            <section class="sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-0 lg:gap-10 2xl:grid-cols-2">
                <NuxtLink data-aos="fade-up" :to="section_3.box_3.path" class="h-fit" :aria-label="section_3.box_3.title">
                    <div class="bg-gray-5 mb-4 flex justify-center hover:bg-yellow-2 transition-all">
                        <img :src="section_3.box_3.icon" alt="" class="h-full max-h-[235px]">
                    </div>
                    <p class="text-lg font-medium text-center leading-5">{{ section_3.box_3.title }}</p>
                </NuxtLink>
                <NuxtLink data-aos="fade-up" :to="section_3.box_4.path" class="h-fit" :aria-label="section_3.box_4.title">
                    <div class="bg-gray-5 mb-4 flex justify-center hover:bg-yellow-2 transition-all">
                        <img :src="section_3.box_4.icon" alt="" class="h-full max-h-[235px]">
                    </div>
                    <p class="text-lg font-medium text-center leading-5">{{ section_3.box_4.title }}</p>
                </NuxtLink>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ArchitectZone } from '@/types/for-professionals.types.ts';

const props = defineProps<{
    data: ArchitectZone;
}>();
const { title, section_1, section_2, section_3 } = toRefs(props.data);
</script>
