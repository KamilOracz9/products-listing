<template>
    <div class="flex justify-center font-breuer">
        <div class="flex flex-col min-h-screen max-w-max-content w-full relative" v-if="!globalStore.locale.isLoading && !headerStore.headerMenu.isLoading">
            <header>
                <TopBar />
                <HeaderMenu />
            </header>

            <main class="flex-1 mt-[114px]">
                <slot />
            </main>

            <footer>
                <Footer />
                <p class="text-center py-6 uppercase text-[1.25rem]">New trendy 2024</p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';

const globalStore = useGlobalStore();
const headerStore = useHeaderStore();
const i18n = useI18n();

onMounted(async () => {
    console.log('asd')
    globalStore.fetchLocale().then(({ defaultLocale }) => {
        // if (defaultLocale) i18n.setLocale(defaultLocale);
    });

    await headerStore.fetchMenuItems(i18n);

    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>