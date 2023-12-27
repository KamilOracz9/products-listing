<template>
    <div class="border-b-2">
        <div class="font-bold p-4 cursor-pointer" @click="toggleOpen">
            <slot name="title" />
        </div>
        <div class="text-xs" :class="open ? 'border-t' : 'hidden'">
            <slot name="body" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['open', 'toggleOpen']);
</script>