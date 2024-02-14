<template>
    <section class="breadcrumbs flex gap-2 text-xs mb-6 uppercase font-medium flex-wrap">
        <NuxtLink v-for="breadcrumb in breadcrumbs" :to="breadcrumb.path" class="text-gray-1 flex gap-2 items-center">{{
            breadcrumb.label }}
            <Arrow :width="10" :direction="'right'" />
        </NuxtLink>
    </section>
</template>

<script setup>
const { breadcrumbs } = defineProps(['breadcrumbs']);
</script>