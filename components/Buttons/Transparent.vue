<template>
    <button v-if="tagType === 'button'" :type="type" @click="onClick"
        class="text-xl flex gap-5 uppercase leading-[1.625rem] py-3.5 px-6 border w-full items-center">
        <span class="translate-y-[2px]">{{ label }}</span><Arrow :direction="'right'" />
    </button>
    <NuxtLink role="button" v-if="tagType === 'link'" :type="type" :to="url"
        class="text-xl flex gap-5 uppercase leading-[1.625rem] py-3.5 px-6 border w-full items-center">
        <span class="translate-y-[2px]">{{ label }}</span><Arrow :direction="'right'" />
    </NuxtLink>
</template>

<script setup>
const { type, tagType, url, onClick, label } = defineProps(['type', 'tagType', 'url', 'onClick', 'label']);
</script>