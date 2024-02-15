<template>
    <ul class="px-5 flex justify-between items-center xl:mr-[70px]">
        <li>
            <NuxtLink to="/" :aria-label="$t('home-page')"><img src="@/assets/images/logo.svg" class="aspect-[auto_4/3] w-[161px] small-height:w-[100px]" width="214" alt=""></NuxtLink>
        </li>

        <li class="lg:hidden">
            <button type="button" aria-label="Toggle menu" @click="headerStore.toggleMenuIsOpen()">
                <div class="bg-gray-2 flex w-12 h-12 items-center justify-center">
                    <img src="@/assets/icons/burger-menu.svg" width="20" alt="" v-if="!headerStore.menuIsOpen">
                    <img src="@/assets/icons/close.svg" width="20" alt="" v-if="headerStore.menuIsOpen">
                </div>
            </button>
        </li>
    </ul>
</template>

<script setup>
const headerStore = useHeaderStore();
</script>