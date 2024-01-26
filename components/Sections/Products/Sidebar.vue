<template>
    <section :class="productsFilterStore.isOpen ? '' : 'hidden'" class="absolute top-0 left-0 bg-white w-full h-full z-40 lg:!flex lg:relative lg:z-0 lg:w-1/4">
        Sidebar
        <button class="lg:hidden" @click="productsFilterStore.isOpen = false">x</button>
    </section>
</template>

<script setup>
const productsFilterStore = useProductsFilterStore();
</script>