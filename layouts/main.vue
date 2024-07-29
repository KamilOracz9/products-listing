<template>
    <div class="flex justify-center font-breuer">
        <div v-if="!globalStore.isLoading" class="flex flex-col min-h-screen max-w-max-content w-full relative">
            <header class="relative z-30">
                <TopBar />
                <HeaderMenu />
            </header>

            <main class="flex-1 mt-[144px] px-4 small-height:mt-[76px] relative 3xl:px-0">
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
const globalStore = useGlobalStore();

onMounted(async () => {
    await globalStore.fetchGlobalData();

    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>