<template>
    <SectionsCommonAccordion :label="$t('product.download-files')" id="download-files">
        <div>
            <ul>
                <li v-for="file in Object.values(files).filter(file => file)">
                    <NuxtLink :to="file.value" target="blank">{{ file.label }}</NuxtLink>
                </li>
            </ul>
        </div>
    </SectionsCommonAccordion>
</template>

<script setup lang="ts">
import type { Files } from '~/types/products.types';

const props = defineProps<{
    files: Files;
}>();

const { files } = toRefs(props);
</script>