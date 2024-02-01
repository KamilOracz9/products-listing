<template>
    <div v-if="badge" class="absolute top-[44px] -left-[60px] -rotate-90">
        <p class="text-sm font-bold uppercase pt-2 pb-1 text-center w-[120px] rounded-bl-xs"
            :style="`background: ${badge.bgColor}; color: ${badge.color}`">{{ badge.label }}</p>
    </div>
</template>

<script setup>
const { badge } = defineProps(['badge']);
</script>