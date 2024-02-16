<template>
    <section class="mt-6 grid gap-10 md:grid-cols-2 md:mt-10 mb-10">
        <div>
            <p class="font-medium text-xl mb-2 pb-2 sm:text-xl">{{ selected?.label }}</p>
            <ul>
                <li v-for="(city, index) in section.cities" :key="index">
                    <p class="font-medium text-lg flex gap-2 mb-2 mt-6 lg:mt-10 lg:mb-6">
                        <Arrow :direction="'upper'" /> {{ city.label }}
                    </p>
                    <ul class="flex flex-col gap-4">
                        <li class="bg-gray-2 flex justify-between font-bold p-4 sm:text-lg xl:max-w-[375px]"
                            v-for="(contact, index) in city.contacts" :key="index">
                            <div>
                                <p>{{ contact.name }}</p>
                                <p>{{ contact.phone }}</p>
                            </div>

                            <img src="@/assets/icons/phone.svg" class="h-[50px] w-[32px]" alt="">
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="flex flex-col gap-6">
            <p class="font-medium text-xl sm:text-xl">{{ section.reklamationsForm.title }}</p>
            <p class="section-text">{{ section.reklamationsForm.text }}</p>
            <ul class="flex flex-col gap-4 [&>li>a]:justify-between [&>li>a]:border-black">
                <li class="xl:max-w-[344px]" v-for="(button, index) in section.reklamationsForm.buttons" :key="index">
                    <ButtonsTransparent tagType="link" :url="localePath({name: 'form-online'})" :label="button.buttonText" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IServiceSection5 } from "~/types/service";

const localePath = useLocalePath();

const props = defineProps<{
    section: IServiceSection5
}>()

const selected = inject<{
    label: string;
    value: string;
}>('selected');
const { section } = props;
</script>