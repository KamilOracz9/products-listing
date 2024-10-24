<template>
    <ul class="pr-5 flex justify-between items-center xl:mr-[70px]">
        <li>
            <NuxtLink :to="localePath({path: '/'})" :aria-label="$t('home-page')" :title="$t('home-page')">
                <h1 v-if="$isHomePage()">
                    <img src="/assets/images/logo.svg" class="aspect-[auto_4/3] w-[181px] small-height:w-[100px]" width="214" alt="NEW TRENDY" title="NEW TRENDY" />
                </h1>
                <img v-else src="/assets/images/logo.svg" class="aspect-[auto_4/3] w-[181px] small-height:w-[100px]" width="214" alt="NEW TRENDY" title="NEW TRENDY" />
            </NuxtLink>
        </li>

        <li class="lg:hidden">
            <button type="button" aria-label="Toggle menu" @click="headerStore.toggleMenuIsOpen()">
                <div class="bg-gray-2 flex w-12 h-12 items-center justify-center">
                    <img src="@/assets/icons/burger-menu.svg" width="20" alt="Menu" title="Menu" v-if="!headerStore.menuIsOpen">
                    <img src="@/assets/icons/close.svg" width="20" alt="Close menu" title="Close menu" v-if="headerStore.menuIsOpen">
                </div>
            </button>
        </li>
    </ul>
</template>

<script setup>
const headerStore = useHeaderStore();
const localePath = useLocalePath();

const props = defineProps(['toggleMenu'])
</script>