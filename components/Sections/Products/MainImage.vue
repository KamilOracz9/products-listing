<template>
    <picture class="w-full cursor-pointer" @click="modalIsOpen = true">
        <source media="(min-width:768px)" :srcset="image.desktop">
        <source media="(min-width:450px)" :srcset="image.tablet">
        <img :src="image.mobile"
            class="w-full aspect-[3/4] object-cover rounded-tr-[36px]">
    </picture>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';

const props = defineProps<{
    image: IPhoto;
}>();

const { image } = toRefs(props);

const modalIsOpen = inject('modalIsOpen');
</script>