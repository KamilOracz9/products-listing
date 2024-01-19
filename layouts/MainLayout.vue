<template>
    <div class="flex justify-center font-breuer">
        <div class="flex flex-col min-h-screen max-w-max-content w-full relative">
            <header>
                <TopBar />
                <HeaderMenu />
            </header>

            <main class="flex-1 mt-[114px]">
                main
            </main>

            <footer>
                <Footer />
                <p class="text-center py-6 uppercase text-[1.25rem]">New trendy 2024</p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">

onMounted(() => {
    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>