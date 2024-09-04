<template>
    <button v-if="tagType === 'button'" :type="type" @click="onClick" :aria-label="label"
        class="transparent-button">
        <span class="translate-y-[2px]">{{ label }}</span><Arrow :direction="'right'" />
    </button>
    <NuxtLink :target="target" role="button" v-if="tagType === 'link'" :type="type" :to="url" :aria-label="label"
        class="transparent-button">
        <span class="translate-y-[2px]">{{ label }}</span><Arrow :direction="'right'" />
    </NuxtLink>
</template>

<script setup lang="ts">
const { type, tagType, url, onClick, label, target } = withDefaults(defineProps<{
    url?: string;
    tagType: 'link' | 'button';
    onClick?: () => void;
    label: string;
    type?: "button" | "submit" | "reset";
    target?: '_blank';
}>(), {
    type: "button",
});
</script>