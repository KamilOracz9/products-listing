<template>
    <div class="absolute bottom-0 right-0 translate-y-full p-5 grid gap-2">
        <div v-for="message in messages" class="p-2 rounded-xs shadow-md" :class="getTheme(message.type)">
            {{ $t(message.message) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { Types } from '~/enums/flashMessage';
import { useFlashMessageStore } from '~/stores';

const flashMessages = useFlashMessageStore();
const { messages } = toRefs(flashMessages);

const getTheme = (type: Types) => {
    let colors = '';

    switch (type) {
        case Types.ERROR: colors = 'text-white bg-red-600'; break;
        case Types.SUCCESS: colors = 'text-white bg-green-500'; break;
    }

    return colors;
}
</script>