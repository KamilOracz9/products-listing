<template>
    <button @click="clipboardStore.toggleItem(id, locale)" :aria-label="`${$t('product.add-to-clipboard')}: ${symbol}`"><img
            class="min-w-4 min-h-4" :title="$t('product.add-to-clipboard')"
            :class="clipboardStore.hasItem(id) ? 'yellow-1-filter' : ''" src="~/assets/icons/clipboard.svg"
            :alt="`${$t('product.add-to-clipboard')}: ${symbol}`"></button>
</template>

<script setup lang="ts">
const clipboardStore = useClipboardStore();
const locale = ref(getLocaleIso());

const props = defineProps<{
    id: number;
    symbol: string;
}>();

const { id, symbol } = toRefs(props);
</script>