<template>
    <div class="flex justify-center font-breuer">
        <div class="flex flex-col min-h-screen w-full relative">
            <header class="relative z-30">
                <HeaderMenu />
            </header>

            <main class="min-h-[80vh] flex-1 mt-[144px] small-height:mt-[76px] relative grid-content">
                <!-- <template v-if="pending">
                    <Loading />
                </template>
                <template v-else> -->
                    <slot />
                <!-- </template> -->
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>