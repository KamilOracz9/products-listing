<template>
    <section class="mb-20">
        <p class="section-title">{{ architectZone.title }}</p>

        <section class="for-professionas-section">
            <div v-html="architectZone.section1.text" class="section-text lg:my-0"></div>

            <div>
                <p class="font-medium text-xl sm:text-2xl">{{ architectZone.section2.title }}</p>

                <div v-html="architectZone.section2.text" class="section-text"></div>
            </div>
        </section>

        <div class="for-professionas-section">
            <section class="bg-gray-5 pt-5 mb-6 lg:mb-0">
                <div class="px-5 sm:px-7 sm:pt-5">
                    <p class="font-medium text-lg mb-2 sm:text-xl">{{ architectZone.section3.title }}</p>

                    <ul class="mb-auto pl-6 flex flex-col gap-1 sm:text-lg">
                        <li class="list-disc" v-for="(item, index) in architectZone.section3.list" :key="index">{{ item }}
                        </li>
                    </ul>
                </div>

                <div class="bg-yellow-2 p-8 rounded-tl-[25px] mt-6 text-lg lg:text-xl xl:w-[calc(50%-1.25rem)] xl:ml-auto">
                    <ul class="flex flex-col gap-6">
                        <li class="flex gap-4 items-center"><img class="w-[28px] aspect-[1/1]"
                                src="@/assets/icons/phone.svg" alt=""> {{ architectZone.section3.contact.phone }}</li>
                        <li class="flex gap-4 items-center"><img class="w-[28px] aspect-[1/1]"
                                src="@/assets/icons/envelope.svg" alt=""> {{ architectZone.section3.contact.phone }}</li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="h-[335px] relative mb-6 lg:mt-0 lg:h-full">
                    <picture>
                        <source media="(min-width: 1024px)" :srcset="architectZone.section4.image.desktop">
                        <source media="(min-width: 450px)" :srcset="architectZone.section4.image.tablet">
                        <img :src="architectZone.section4.image.mobile" alt=""
                            class="w-full h-full object-cover rounded-tr-[25px]">
                    </picture>
                    <div
                        class="absolute bottom-0 left-0 p-5 flex flex-col gap-5 text-white [&>a>img]:white-filter [&>a]:w-fit">
                        <p class="text-[1.25rem] font-medium">{{ architectZone.section4.title }}</p>
                        <ButtonsTransparent tagType="link" :label="architectZone.section4.buttonText" />
                    </div>
                </div>
            </section>
        </div>

        <div class="grid gap-6 lg:gap-10 lg:mt-10 xl:grid-cols-2">
            <section class="sm:grid sm:gap-6 sm:grid-cols-2 lg:gap-10 lg:mt-0 2xl:grid-cols-2">
                <SectionsCommonBox boxClass="bg-gray-5 lg:order-1 xl:-order-1" :box="architectZone.section5.boxLeft" />
                <SectionsCommonBox boxClass="bg-yellow-2 rounded-br-[25px] mt-6 md:rounded-br-lg sm:mt-0"
                    :box="architectZone.section5.boxRight" />
            </section>

            <section class="sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-0 lg:gap-10 2xl:grid-cols-2">
                <NuxtLink :to="architectZone.section6.boxLeft.path" class="h-fit">
                    <div class="bg-gray-5 mb-4 flex justify-center">
                        <img :src="architectZone.section6.boxLeft.image" alt="" class="h-full max-h-[235px]">
                    </div>
                    <p class="text-lg font-medium text-center leading-5">{{ architectZone.section6.boxLeft.title }}</p>
                </NuxtLink>
                <NuxtLink :to="architectZone.section6.boxRight.path"  class="h-fit">
                    <div class="bg-gray-5 mb-4 flex justify-center">
                        <img :src="architectZone.section6.boxRight.image" alt="" class="h-full max-h-[235px]">
                    </div>
                    <p class="text-lg font-medium text-center leading-5">{{ architectZone.section6.boxRight.title }}</p>
                </NuxtLink>
            </section>
        </div>
    </section>
</template>

<script setup>
const forProfessionalStore = inject('forProfessionalStore');
const partnerZone = forProfessionalStore.partnerZone;
const architectZone = forProfessionalStore.architectZone;
</script>
