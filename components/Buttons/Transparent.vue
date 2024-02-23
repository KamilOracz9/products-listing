<template>
    <button v-if="tagType === 'button'" :type="type" @click="onClick"
        class="transparent-button">
        <span class="translate-y-[2px]">{{ label }}</span><Arrow :direction="'right'" />
    </button>
    <NuxtLink role="button" v-if="tagType === 'link'" :type="type" :to="url"
        class="transparent-button">
        <span class="translate-y-[2px]">{{ label }}</span><Arrow :direction="'right'" />
    </NuxtLink>
</template>

<script setup>
const { type, tagType, url, onClick, label } = defineProps(['type', 'tagType', 'url', 'onClick', 'label']);
</script>