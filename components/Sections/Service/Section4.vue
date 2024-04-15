<template>
    <section class="mt-6 grid gap-4 md:grid-cols-2 md:gap-10 lg:mt-10" :id="slugify($t('certified-installers'))">
        <SectionsCommonBox boxClass="bg-yellow-2" :box="{
            button: '',
            path: '',
            text: left.text,
            title: left.title
        }" type="select">
            <InputSelect :options="options" />
        </SectionsCommonBox>
        <SectionsCommonBox boxClass="bg-gray-5 rounded-br-[25px] md:rounded-br-lg lg:mt-0" :box="{
            button: right.button,
            path: 'mailto:czesci@newtrendy.pl',
            text: right.text,
            title: right.title
        }" />
    </section>
</template>

<script setup lang="ts">
import type { Section3, Section4 } from '~/types/service.types';

const props = defineProps<{
    data: {
        left: Section3;
        right: Section4;
    };
}>()

const { data } = toRefs(props);
const { left, right } = toRefs(data.value);

const options = computed(() => Object.keys(left.value.installer_options).map(key => ({
    value: key,
    label: left.value.installer_options[key],
})));
</script>