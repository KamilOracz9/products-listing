<template>
    <SectionsCommonAccordion :label="$t('product.download-files')" id="download-files">
        <div>
            <ul>
                <li v-for="file in Object.values(files).filter(file => file)">
                    <NuxtLink v-if="file.value" :to="file.value" target="blank" :aria-label="file.label">{{ file.label }}</NuxtLink>
                    <template v-else>
                        <NuxtLink v-for="fileChild in file" :to="fileChild.value" target="blank" class="block" :aria-label="fileChild.label">{{ fileChild.label }}</NuxtLink>
                    </template>
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

console.log(files.value)
</script>