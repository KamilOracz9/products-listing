<template>
    <div ref="headerMenuRef" class="full-width content-grid">
        <div class="grid-content">
            <div class="flex justify-between w-full relative flex-col lg:flex-row">
                <SectionsHeaderLogo />
            </div>

            <LazyFlashMessages />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Header } from '~/types/layout.types';

const props = defineProps<{
    data: Header;
}>();

</script>