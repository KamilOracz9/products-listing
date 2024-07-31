<template>
    <button @click="clipboardStore.toggleItem(id)"
        :aria-label="`${$t('pages.product.toggle-clipboard')}: ${symbol}`"><img class="min-w-4 min-h-4" :class="clipboardStore.hasItem(id) ? 'yellow-1-filter' : ''"
            src="/assets/icons/clipboard.svg" :alt="`${$t('pages.product.toggle-clipboard')}: ${symbol}`"></button>
</template>

<script setup lang="ts">
const clipboardStore = useClipboardStore();

const props = defineProps<{
    id: number;
    symbol: string;
}>();

const { id, symbol } = toRefs(props);

// console.log(clipboardStore.items.find(item => item.variant_id == id))
// console.log(!!clipboardStore.items.find(item => item.variant_id === toValue(id)))
console.log()
</script>
