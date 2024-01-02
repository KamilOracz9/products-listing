<template>
    <div class="flex flex-col h-screen xl:flex-row">
        <div class="w-full flex-1">
            <slot />
        </div>

        <div @click="menuIsOpen = !menuIsOpen" class="p-3 flex justify-center transition-all xl:hidden"
            :class="menuIsOpen ? 'rotate-180' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                <path
                    d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
        </div>

        <div ref="menu" :class="menuIsOpen ? 'h-[80%]' : 'h-0'"
            class="w-full overflow-y-auto flex flex-col border-t-2 xl:h-full xl:w-[20%] xl:border-l-2 xl:border-t-0 transition-all">
            <Actions />
            <Legend />
            <Filters />
            <ActiveLocation />
            <div class="flex-1 bg-[#fff] w-full z-10"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const menu: Ref<HTMLElement | null> = ref(null);
const menuIsOpen = ref(false);
</script>