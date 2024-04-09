<template>
    <div data-aos="fade-up" class="[&>a]:border-black [&>a]:w-fit min-h-[265px] flex flex-col p-5 sm:p-7"
        :class="boxClass ? boxClass : ''">
        <p class="font-medium text-lg mb-2 sm:text-xl">{{ box.title }}</p>
        <div class="mb-auto sm:text-lg" v-html="box.text"></div>
        <ButtonsTransparent v-if="!type" :label="box.button" tagType="link" :url="box.path" />
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    box: {
        button: string;
        path: string;
        text: string;
        title: string;
    };
    boxClass?: string;
    type?: string;
}>();
const { box, boxClass, type } = toRefs(props);
</script>