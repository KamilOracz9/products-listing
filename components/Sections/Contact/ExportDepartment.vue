<template>
    <section class="mt-10" :id="slugify($t('pages.contact.export-department'))">
        <p class="section-subtitle">{{ $t('pages.contact.export-department') }}</p>

        <div class="section-text" v-html="exportDepartment.text"></div>

        <div class="mt-6 md:grid md:grid-cols-5 lg:grid-cols-3 gap-6 lg:gap-10">
            <div class="md:col-span-2 lg:col-span-1">
                <img class="w-full" :src="exportDepartment.image" alt="">
            </div>
            <div class="md:col-span-3 lg:col-span-2">
                <SectionsContactEmployees :employees="exportDepartment.employees" />
            </div>
        </div>
    </section>
</template>

<script setup>
import slugify from '~/plugins/slugify';

const contactStore = inject('contactStore');

const { exportDepartment } = contactStore;
</script>