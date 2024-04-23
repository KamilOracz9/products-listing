<template>
    <div class="flex justify-center font-breuer">
        <div class="flex flex-col min-h-screen max-w-max-content w-full relative" v-if="!globalStore.locale.isLoading">
            <header class="relative z-30">
                <TopBar />
                <HeaderMenuV2 />
            </header>

            <main class="flex-1 mt-[144px] px-4 small-height:mt-[76px] relative 3xl:px-0" v-if="!categoryStore.list.isLoading">
                <div class="fixed z-50 right-0 top-1/2 -translate-y-1/2 rotate-90 translate-x-[42%] text-white flex" style="font-size: clamp(1rem, 2cqw, 2rem);">
                    <div class="bg-yellow-1 flex items-center justify-center p-4">測試版</div>
                    <div class="bg-red-600 flex items-center justify-center p-4">Wersja testowa</div>
                </div>
                <slot />
            </main>

            <footer>
                <LazyFooter />
                <p class="text-center py-6 uppercase text-[1.25rem]">New trendy 2024</p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore();
const categoryStore = useCategoryStore();

onMounted(async () => {
    globalStore.fetchLocale();

    categoryStore.fetchCategories();
    await prefetchComponents(['HeaderMenu', 'TopBar', 'Footer'])

    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>