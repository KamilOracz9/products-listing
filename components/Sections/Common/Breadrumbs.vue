<template>
    <section>
        <ul class="breadcrumbs flex gap-2 text-xs mb-6 uppercase font-medium flex-wrap">
            <li v-for="breadcrumb in breadcrumbs" class="text-gray-1">
                <NuxtLink :to="breadcrumb.path" class="flex gap-2 items-center">{{ breadcrumb.label }} <Arrow :width="10" :direction="'right'" /></NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup>
const { breadcrumbs } = defineProps(['breadcrumbs']);
</script>