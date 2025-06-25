<template>
    <div class="mb-10">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

        <p class="section-title">{{ title }}</p>

        <ul class="flex flex-col gap-6 lg:gap-10">
            <li v-for="(section, index) in description.content" :key="index" class="flex flex-col gap-6 lg:gap-10"
                data-aos="fade-up">
                <p class="uppercase text-[1.5rem] leading-[2.25rem] sm:text-[2rem]">{{ section.title }}</p>

                <ul class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-10">
                    <li v-for="(file, index) in section.items" :key="index">
                        <NuxtLink :to="file.link" :aria-label="file.text">
                            <div class="rounded-br-[25px] flex items-center justify-center aspect-[1/1]"
                                :style="file.color ? `background: ${getBgColor(file.color)}` : ''">
                                <img :src="file.image" class="size-[60%]" alt="">
                            </div>

                            <p class="text-sm mt-2 text-center sm:text-base">{{ file.text }}</p>
                        </NuxtLink>
                    </li>
                </ul>

                <div class="self-start [&>a]:border-black">
                    <ButtonsTransparent v-if="section.button" tagType="link" :url="section.link"
                        :label="section.button" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchDownloadPage } from '~/services/api/download';
import type { DownloadPage } from '~/types/download.types';

const { data } = await useAsyncData(DataKeys.DOWNLOAD_PAGE, async () => fetchDownloadPage(getLocaleIso()));
const { breadcrumbs, description, meta, title, schema } = toRefs(data.value as DownloadPage);

setMeta(meta.value);

useSchemaOrg([
  schema.value
])
</script>