<template>
    <div class="flex justify-center font-breuer">
        <Modals />

        <div class="flex flex-col min-h-screen max-w-max-content w-full relative" v-if="!globalStore.locale.isLoading && !headerStore.headerMenu.isLoading">
            <header class="relative z-30">
                <TopBar />
                <HeaderMenu />
            </header>

            <main class="flex-1 mt-[114px] px-4 3xl:px-0" v-if="!categoryStore.list.isLoading">
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
const headerStore = useHeaderStore();
const globalStore = useGlobalStore();
const categoryStore = useCategoryStore();

onMounted(async () => {
    globalStore.fetchLocale();

    categoryStore.fetchCategories();
    await headerStore.fetchMenuItems(useI18n());

    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>