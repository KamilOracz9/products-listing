<template>
    <div :id="id" class="border border-t-0 border-black">
        <div class="flex justify-between px-5 py-4" @click="openAccordionId === id ? openAccordionId = '' : openAccordionId = id;">
            <p class="text-lg font-medium leading-5">{{ label }}</p>
            <img src="@/assets/icons/arrow.svg" alt="">
        </div>

        <div class="px-5 pb-4 accordion" :class="openAccordionId === id ? 'active' : ''">
            <slot />
        </div>
    </div>
</template>

<script setup>
const { label, id } = defineProps(['label', 'id']);

const openAccordionId = inject('openAccordionId');
</script>