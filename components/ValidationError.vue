<template>
    <p class="text-red-600" v-if="message">{{ message }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
    messages: string[] | string | undefined;
}>();

const { messages } = toRefs(props);

const message = computed(() => (messages && messages.value) ? typeof(messages.value) === 'string' ? messages.value : messages.value[0] : '');
</script>