<template>
    <div class="flex justify-center font-breuer">
        <div v-if="!pending && data" class="flex flex-col min-h-screen w-full relative">
            <header class="relative z-30">
                <TopBar />
                <HeaderMenu :data="data.header" />
            </header>

            <main class="min-h-[80vh] flex-1 mt-[144px] small-height:mt-[76px] relative grid-content">
                <slot />
            </main>

            <footer class="grid-content">
                <Footer :data="data.footer" />
                <p class="text-center py-6 uppercase text-[1.25rem]">New trendy 2024</p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchLayoutData } from '~/services/api/layout';

const refreshing = ref(false)

const setIsRefreshing = async () => refreshing.value = true;

provide('setIsRefreshing', setIsRefreshing);

const { data, pending } = await useAsyncData(DataKeys.LAYOUT_DATA, async () => fetchLayoutData());

onMounted(async () => {
    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>