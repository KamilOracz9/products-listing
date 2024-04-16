<template>
    <div class="mb-10">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

        <p class="section-title">{{ title }}</p>

        <section class="for-professionas-section">
            <div v-html="section_1.text" class="section-text lg:my-0"></div>

            <div class="mt-6 lg:mt-0">
                <p class="font-medium text-xl sm:text-2xl">{{ section_2.title }}</p>

                <div v-html="section_2.text" class="section-text my-2 lg:my-4"></div>
            </div>
        </section>

        <SectionsServiceSection3 :data="{
            left: {
                items: section_1.items,
            },
            right: {
                image: section_2.image,
                text: section_2.text_image
            }
        }" />
        <SectionsServiceSection4 :data="{ left: section_3, right: section_4 }" />
        <SectionsServiceSection5 :installers="section_3.installers" :reklamationForm="section_5" />
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchServicePage } from '~/services/api';
import type { ServicePage } from '~/types/service.types';

const selected: Ref<{
    label: string;
    value: string;
} | null> = ref(null);

provide('selected', selected)

const { data } = await useAsyncData(DataKeys.SERVICE_PAGE, () => fetchServicePage());
const { breadcrumbs, description, meta, title } = toRefs(data.value as ServicePage);
const { section_1, section_2, section_3, section_4, section_5 } = toRefs(description.value.content);

setMeta(meta.value);
</script>