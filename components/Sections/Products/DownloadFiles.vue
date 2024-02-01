<template>
    <SectionsProductsAccordion :label="$t('product.download-files')" id="download-files">
        <div>
            <ul>
                <li v-for="file in productStore.product.item.files">
                    <NuxtLink :to="file.url" target="blank">{{ file.label }}</NuxtLink>
                </li>
            </ul>
        </div>
    </SectionsProductsAccordion>
</template>

<script setup>
const productStore = inject('productStore');
</script>