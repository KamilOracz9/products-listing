<template>
    <NuxtLink
        :to="`${useAppConfig().public.base}/pim/products/${productId}/variants/${variantId}/export-to-pdf?locale=${getLocaleIso}`"
        target="_blank">
        <img src="/assets/icons/pdf.svg" alt="" class="min-w-4 min-h-4">
    </NuxtLink>
</template>

<script setup lang="ts">
import { getLocaleIso } from "~/utils";

const props = defineProps<{
    productId: number;
    variantId: number;
}>();

const { productId, variantId } = toRefs(props);
</script>