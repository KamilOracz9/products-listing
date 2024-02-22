<template>
    <div>
        <p class="header__label" @click="toggleSubmenu(slug)">{{ $t(slug) }}</p>
        <div class="header__dropdown" :data-active="activeSubmenu === slug ? true : false">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const activeSubmenu = inject('activeSubmenu');
const toggleSubmenu = inject('toggleSubmenu');

const props = defineProps<{
    slug: string;
}>();

const { slug } = props;
</script>