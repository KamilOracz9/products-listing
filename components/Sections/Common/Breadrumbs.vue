<template>
    <section>
        <ul class="breadcrumbs flex gap-2 text-xs mb-6 uppercase font-medium">
            <li v-for="breadcrumb in breadcrumbs" class="text-gray-1">
                <NuxtLink :to="breadcrumb.path" class="flex gap-2 items-center">{{ breadcrumb.label }} <img src="@/assets/icons/arrow.svg" class="-translate-y-[1px] -rotate-90 h-[10px] gray-1-filter" alt=""></NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup>
const { breadcrumbs } = defineProps(['breadcrumbs']);
</script>