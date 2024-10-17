<template>
    <div class="block lg:hidden">
        <p class="header__label flex gap-2 items-center" @click="headerStore.setSubmenu(slug)">
            <img v-if="icon" width="16" height="16" class="header__icon" :src="icon" alt="">
            <span class="mx-auto lg:hidden 2xl:block">{{ name ?? $t(slug) }}</span>
        </p>
        <div class="header__dropdown" :data-active="headerStore.submenu === slug ? true : false">
            <slot />
        </div>
    </div>

    <div class="hidden lg:block">
        <div @click="headerStore.setSubmenu(slug)" class="header__label flex gap-2 items-center" ref="label">
            <img v-if="icon" width="16" height="16" class="header__icon" :src="icon" alt="">
            <span class="mx-auto" :class="icon ? 'lg:hidden xl:block' : 'lg:block'">{{ name ?? $t(slug) }}</span>
        </div>
        <div class="header__dropdown" ref="submenu" :data-active="headerStore.submenu === slug ? true : false">
            <div class="w-full max-w-max-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const headerStore = useHeaderStore();

const props = defineProps<{
    slug: string;
    name?: string;
    icon?: string;
    position?: 'sticky' | null;
}>();

const { slug, icon, position, name } = toRefs(props);
const label = ref();
const submenu = ref();

onMounted(() => {
    if (position.value === 'sticky' && submenu.value.querySelector('.header__links')) submenu.value.querySelector('.header__links').style.left = `${submenu.value.offsetLeft - 16}px`;
})
</script>