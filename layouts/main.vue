<template>
    <div class="flex justify-center font-breuer">
        <div v-if="!globalStore.isLoading" class="flex flex-col min-h-screen w-full relative">
            <header class="relative z-30">
                <TopBar />
                <HeaderMenu />
            </header>

            <main class="min-h-[80vh] flex-1 mt-[144px] small-height:mt-[76px] relative grid-content">
                <slot />
            </main>

            <footer class="grid-content">
                <Footer />
                <p class="text-center py-6 uppercase text-[1.25rem]">New trendy 2024</p>
            </footer>
        </div>
        <div class="flex min-h-screen items-center justify-center" v-if="globalStore.isLoading">
            <Loading />
        </div>
    </div>
</template>

<script setup lang="ts">
import Loading from '~/components/Loading.vue';

const globalStore = useGlobalStore();
const { locale, locales } = useI18n();
const route = useRoute();

watch(locale, async (value: string) => {
    await globalStore.fetchGlobalData(locales.value.filter(({ code }: { code: string }) => code === value)[0].iso);

    if (route.name.split('___')[0] !== 'products') window.history.replaceState({}, '', route.path);
});

onMounted(async () => {
    await globalStore.fetchGlobalData();

    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>