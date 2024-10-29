<template>
    <section class="pt-10" :id="slugify($t('pages.contact.export-department'), false)">
        <p data-aos="fade-up" class="section-subtitle">{{ title }}</p>

        <div data-aos="fade-up" class="section-text" v-html="text"></div>

        <div class="mt-6 md:grid md:grid-cols-5 lg:grid-cols-3 gap-6 lg:gap-10">
            <div data-aos="fade-up" class="md:col-span-2 lg:col-span-1">
                <img class="w-full" :src="image" alt="">
            </div>
            <div data-aos="fade-up" class="md:col-span-3 lg:col-span-2">
                <SectionsContactEmployeesExport :employees="items" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ExportDepartment } from '~/types/contact.types.ts';

const props = defineProps<{
    data: ExportDepartment
}>();
const { data } = toRefs(props);
const { image, items, text, title } = toRefs(data.value);
</script>