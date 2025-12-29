<template>
    <div class="border [&:not(:last-child)]:border-b-0 border-black">
        <div class="flex justify-between px-5 py-4 cursor-pointer" @click="openAccordionId === id ? openAccordionId = '' : openAccordionId = id;">
            <p class="text-lg font-medium leading-5" :id="id">{{ label }}</p>
            <Arrow />
        </div>

        <div class="px-5 pb-4 accordion" :class="openAccordionId === id ? 'active' : ''">
            <slot />
        </div>
    </div>
</template>

<script setup>
const { label, id } = defineProps(['label', 'id']);

const openAccordionId = inject('openAccordionId');

watch(openAccordionId, async (value) => {
    if(value) navigateTo(`#${value}`);
})
</script>