<template>
    <section id="home-additional-content">
        <div class="information mt-6 flex flex-col gap-4 [&_h2]:text-[1.875rem] [&_h2]:font-medium [&_h2]:leading-[120%]" v-html="information.html" />
        <div class="yellow-box bg-yellow-2 px-10 py-6 flex flex-col gap-8 mt-8 text-[1.25rem]" v-html="yellow.html" />
        <div class="welcome [&_h2]:text-[1.375rem] [&_h2]:font-medium [&_h2]:leading-[120%] [&_h2]:mt-5" v-html="welcome.html" />
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: {
        information: {
            html: string;
        };
        yellow: {
            html: string;
        };
        welcome: {
            html: string;
        };
    };
}>();
const { data } = toRefs(props);
const { information, yellow, welcome } = toRefs(reactive(data.value));
</script>