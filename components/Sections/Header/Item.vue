<template>
    <div class="lg:hidden" @click="headerStore.setSubmenu(slug)">
        <p @mouseover="headerStore.setSubmenu(slug, false)" class="header__label flex gap-2 items-center">
            <img v-if="icon" width="16" height="16" class="header__icon" :src="icon" alt="">
            <span class="mx-auto lg:hidden 2xl:block">{{ $t(slug) }}</span>
        </p>
        <div class="header__dropdown" :data-active="headerStore.submenu === slug ? true : false">
            <slot />
        </div>
    </div>

    <div class="hidden lg:block" @mouseleave="headerStore.setSubmenu('')">
        <p @click="headerStore.setSubmenu(slug)" @mouseover="headerStore.setSubmenu(slug, false)"
            class="header__label flex gap-2 items-center">
            <img v-if="icon" width="16" height="16" class="header__icon" :src="icon" alt="">
            <span class="mx-auto lg:hidden 2xl:block">{{ $t(slug) }}</span>
        </p>
        <div class="header__dropdown" :data-active="headerStore.submenu === slug ? true : false">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const headerStore = useHeaderStore();

const props = defineProps<{
    slug: string;
    icon?: string;
}>();

const { slug, icon } = props;
</script>