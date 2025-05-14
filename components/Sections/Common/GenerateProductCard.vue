<template>
    <NuxtLink
        :to="`${useAppConfig().public.base}/api/v1/products/${productId}/variants/${variantId}/export-to-pdf?locale=${localeIso}`"
        target="_blank">
        <img src="/assets/icons/product_card.svg" :alt="$t('product.generate-product-card')" class="min-w-4 min-h-4"
            :title="$t('product.generate-product-card')">
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    productId: number;
    variantId: number;
}>();

const { productId, variantId } = toRefs(props);

const localeIso = ref(getLocaleIso());
</script>