
<template>
    <div class="[&>a]:border-black [&>a]:w-fit min-h-[265px] flex flex-col p-5 sm:p-7" :class="boxClass ? boxClass : ''">
        <p class="font-medium text-lg mb-2 sm:text-xl">{{ box.title }}</p>
        <div class="mb-auto sm:text-lg" v-html="box.text"></div>
        <ButtonsTransparent :label="box.buttonText" tagType="link" :url="box.path" />
    </div>
</template>

<script setup>
const { box, boxClass } = defineProps(['box', 'boxClass']);
</script>