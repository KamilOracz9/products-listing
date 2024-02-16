<template>
    <section class="mt-10 border-b mb-10 pb-10 border-gray-1" :id="slugify($t('pages.contact.sale-service-department'))">
        <p class="section-subtitle">{{ $t('pages.contact.sale-service-department') }}</p>

        <div class="section-text" v-html="saleServiceDepartment.text"></div>

        <div class="mt-6 md:grid md:grid-cols-5 lg:grid-cols-3 gap-6 lg:gap-10">
            <div class="md:col-span-2 lg:col-span-1">
                <InputSelect :options="saleServiceDepartment.options" />
                <SectionsContactSalesServiceDepartmentMap :options="saleServiceDepartment.options" />
            </div>
            <div class="md:col-span-3 lg:col-span-2">
                <p class="section-subtitle capitalize">{{ selected?.label ?? $t('pages.contact.select-region') }}</p>
                <SectionsContactEmployees :employees="contactStore.saleServiceDepartment.employees" />
            </div>
        </div>
    </section>
</template>

<script setup>
import slugify from '~/plugins/slugify';

const contactStore = inject('contactStore');
const selected = ref(null);

provide('selected', selected);

const { saleServiceDepartment } = contactStore;

watch(selected, async () => {
    await contactStore.fetchCustomers();
})
</script>