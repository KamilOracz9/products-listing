<template>
    <section class="mt-6 grid gap-10 md:grid-cols-2 md:mt-10 mb-10">
        <div>
            <p class="font-medium text-xl mb-2 pb-2 sm:text-xl">{{ selected?.label }}</p>
            <ul v-if="selected">
                <li v-for="(city, index) in cities" :key="index">
                    <p class="font-medium text-lg flex gap-2 mb-2 mt-6 lg:mt-10 lg:mb-6">
                        <Arrow :direction="'upper'" /> {{ city.name }}
                    </p>
                    <ul class="flex flex-col gap-4">
                        <li class="bg-gray-2 flex justify-between font-bold p-4 sm:text-lg xl:max-w-[375px]"
                            v-for="(contact, index) in city" :key="index">
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
            <p class="font-medium text-xl sm:text-xl">{{ reklamationForm.title }}</p>
            <p class="section-text">{{ reklamationForm.text }}</p>
            <ul class="flex flex-col gap-4 [&>li>a]:justify-between [&>li>a]:border-black">
                <li class="xl:max-w-[344px]">
                    <ButtonsTransparent tagType="link" :url="localePath({ name: 'download' })"
                        :label="reklamationForm.button_1" />
                </li>
                <li class="xl:max-w-[344px]">
                    <ButtonsTransparent tagType="link" :url="localePath({ name: 'form-online' })"
                        :label="reklamationForm.button_2" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Installer } from '~/types/service.types';

const localePath = useLocalePath();

const selected = inject<{
    label: string;
    value: string;
}>('selected');

const props = defineProps<{
    installers: {
        [key: string]: Installer
    };
    reklamationForm: {
        title: string;
        text: string;
        button_1: string;
        button_2: string;
    };
}>();

const { installers, reklamationForm } = toRefs(props);

const cities = computed(() => (installers.value[selected?.value?.value]));
</script>