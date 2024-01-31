<template>
    <SectionsProductsAccordion :label="$t('product.glass-types')" id="glass-types">
        <div>
            <ul class="flex gap-2 overflow-x-auto pb-3">
                <li v-for="glassType in productStore.product.item.images.glasses" class="min-w-[128px] max-w-[128px] aspect-[1/1]">
                    <img :src="glassType.thumb" alt="">
                </li>
            </ul>

            <p v-if="productStore.product.item.glassDescription" class="pt-3">{{ productStore.product.item.glassDescription }}</p>
        </div>
    </SectionsProductsAccordion>
</template>

<script setup>
const productStore = inject('productStore');
</script>