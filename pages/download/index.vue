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
                    <ButtonsTransparent v-if="section.button" tagType="link" :url="localePath({ name: 'download-3d' })"
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

const localePath = useLocalePath();

const { data } = await useAsyncData(DataKeys.DOWNLOAD_PAGE, async () => fetchDownloadPage());
const { breadcrumbs, description, meta, title } = toRefs(data.value as DownloadPage);

console.log(data.value)

setMeta({
    meta_title: 'Do pobrania | NEW TRENDY',
    meta_description: 'Pobierz katalogi, instrukcje montażu i inne materiały dotyczące kabin prysznicowych, brodzików i akcesoriów. Sprawdź dostępne pliki do pobrania!'
});
</script>