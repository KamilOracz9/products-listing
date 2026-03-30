<template>
    <div class="flex justify-center font-breuer">
        <div v-if="!pending && data" class="flex flex-col min-h-screen w-full relative">
            <header class="relative z-30">
                <HeaderMenu :data="data.header" />
            </header>

            <main class="min-h-[80vh] flex-1 mt-[144px] small-height:mt-[76px] relative grid-content">
                <template v-if="pending">
                    <Loading />
                </template>
                <template v-else>
                    <slot />
                </template>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchLayoutData } from '~/services/api/layout';

const nuxtApp = useNuxtApp()

const lang = ref(getLocaleIso());

const { data, pending } = await useAsyncData(
  `${DataKeys.LAYOUT_DATA}-${lang.value}`,
  () => fetchLayoutData(lang.value),
  {
    getCachedData(key) {
        return (nuxtApp.payload.data[key] || nuxtApp.static.data[key]) ?? null;
    }
  }
)
</script>