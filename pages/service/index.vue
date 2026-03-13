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
        <section v-if="!['pl'].includes(locale)" class="mt-6 grid gap-4 md:grid-cols-2 md:gap-10 lg:mt-10"
            :id="slugify($t('certified-installers'))">
            <SectionsCommonBox boxClass="bg-gray-5 rounded-br-[25px] md:rounded-br-lg lg:mt-0" :box="{
                button: section_4.button,
                path: 'mailto:czesci@newtrendy.pl',
                text: section_4.text,
                title: section_4.title
            }" />
            <div class="flex flex-col gap-6">
                <p class="font-medium text-xl sm:text-xl">{{ section_5.title }}</p>
                <p class="section-text">{{ section_5.text }}</p>
                <ul class="flex flex-col gap-4 [&>li>a]:justify-between [&>li>a]:border-black">
                    <li class="xl:max-w-[344px]">
                        <ButtonsTransparent tagType="link" :url="localePath({ name: 'download' })"
                            :label="section_5.button_1" />
                    </li>
                    <li class="xl:max-w-[344px]">
                        <ButtonsTransparent tagType="link" :url="localePath({ name: 'form-online' })"
                            :label="section_5.button_2" />
                    </li>
                </ul>
            </div>
        </section>
        <template v-else>
            <SectionsServiceSection4 :data="{ left: section_3, right: section_4 }" />
            <SectionsServiceSection5 :installers="section_3.installers" :reklamationForm="section_5" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchServicePage } from '~/services/api';
import type { ServicePage } from '~/types/service.types';

const { locale } = useI18n();
const localePath = useLocalePath();

const selected: Ref<{
    label: string;
    value: string;
} | null> = ref(null);

provide('selected', selected)

const { data } = await useAsyncData(DataKeys.SERVICE_PAGE, async () => fetchServicePage(getLocaleIso()));
const { breadcrumbs, description, meta, title, schema } = toRefs(data.value as ServicePage);
const { section_1, section_2, section_3, section_4, section_5 } = toRefs(description.value.content);

setMeta(meta.value);

useSchemaOrg([
  schema.value
])
</script>