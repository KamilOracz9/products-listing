<template>
    <section class="mt-10 border-b mb-10 pb-10 border-gray-1"
        :id="slugify($t('pages.contact.sale-service-department'))">
        <p data-aos="fade-up" class="section-subtitle">{{ title }}</p>

        <div data-aos="fade-up" class="section-text" v-html="text"></div>

        <div class="mt-6 md:grid md:grid-cols-5 lg:grid-cols-3 gap-6 lg:gap-10">
            <div data-aos="fade-up" class="md:col-span-2 lg:col-span-1">
                <InputSelect :options="options" />
                <SectionsContactSalesServiceDepartmentMap :options="options" />
            </div>
            <div data-aos="fade-up" class="md:col-span-3 lg:col-span-2">
                <p class="section-subtitle capitalize">{{ selected?.label ?? $t('pages.contact.select-region') }}</p>
                <SectionsContactEmployees :employees="items" />
            </div>
        </div>

        <!-- <p data-aos="fade-up" class="section-subtitle">{{ $t('pages.contact.sale-service-department') }}</p>

        <div data-aos="fade-up" class="section-text" v-html="saleServiceDepartment.text"></div>

        <div class="mt-6 md:grid md:grid-cols-5 lg:grid-cols-3 gap-6 lg:gap-10">
            <div data-aos="fade-up" class="md:col-span-2 lg:col-span-1">
                <InputSelect :options="saleServiceDepartment.options" />
                <SectionsContactSalesServiceDepartmentMap :options="saleServiceDepartment.options" />
            </div>
            <div data-aos="fade-up" class="md:col-span-3 lg:col-span-2">
                <p class="section-subtitle capitalize">{{ selected?.label ?? $t('pages.contact.select-region') }}</p>
                <SectionsContactEmployees :employees="contactStore.saleServiceDepartment.employees" />
            </div>
        </div> -->
    </section>
</template>

<script setup lang="ts">
import slugify from '~/plugins/slugify';
import type { Sales } from '@/types/contact.types.ts';

const props = defineProps<{
    data: Sales
}>();

const { data } = toRefs(props);
const { items, options, title, text } = toRefs(data.value);

const selected = ref(null);

provide('selected', selected);
</script>