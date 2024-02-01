<template>
    <div class="flex w-full p-6 overlay">
        <div class="text-lg">{{ count + 1 }} / {{ countBy }}</div>
        <img src="@/assets/icons/close.svg" class="w-[25px] ml-auto" alt="" @click="isOpen = false">
    </div>
</template>

<script setup>
const isOpen = inject('modalIsOpen');
const { count, countBy } = defineProps(['count', 'countBy']);
</script>
