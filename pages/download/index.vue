<template>
    <div class="mb-10">
        <SectionsCommonBreadrumbs :breadcrumbs="downloadStore.breadcrumbs" />

        <p class="section-title">{{ $t('download') }}</p>

        <ul class="flex flex-col gap-6 lg:gap-10">
            <li v-for="(section, index) in downloadStore.sections" :key="index" class="flex flex-col gap-6 lg:gap-10">
                <p class="uppercase text-[1.5rem] leading-[2.25rem] sm:text-[2rem]">{{ section.title }}</p>

                <ul class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-10">
                    <li v-for="(file, index) in section.items" :key="index">
                        <NuxtLink :to="file.url">
                            <div class="rounded-br-[25px] flex items-center justify-center aspect-[1/1]"
                                :style="file.color ? `background: ${file.color}` : ''">
                                <img :src="file.icon" class="size-[60%]" alt="">
                            </div>

                            <p class="text-sm mt-2 text-center sm:text-base">{{ file.label }}</p>
                        </NuxtLink>
                    </li>
                </ul>
                
                <div class="self-start">
                    <ButtonsTransparent v-if="section.button" tagType="link" :url="section.button.path" :label="section.button.buttonText" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const downloadStore = useDownloadStore();

onMounted(async () => {
    downloadStore.fetchData();
})
</script>