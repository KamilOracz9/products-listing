<template>
    <div class="tooltip absolute w-max top-0 -translate-y-[110%] p-3 rounded-[8px] border border-black-2 pointer-events-none transition-all left-1/2 -translate-x-1/2 bg-white text-xs leading-[100%]">
        {{ text }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string;
}>();

const { text } = toRefs(props);
</script>

<style>
.tooltip{
    opacity: 0;
}
</style>