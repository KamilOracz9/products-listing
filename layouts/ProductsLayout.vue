<template>
    <section>
        <h1 class="uppercase">{{ title }}</h1>

        <div class="mt-10 flex">
            <SectionsProductsSidebar />
            <div class="w-full lg:w-3/4 xl:w-full">
                <SectionsProductsCategories />

                <button @click="productsFilterStore.isOpen = true" class="my-10 underline text-2xl lg:hidden">{{ $t('filtering') }} / {{ $t('sorting') }}</button>

                <SectionsProductsListing v-if="!productStore.list.isLoading" />
                <SectionsProductsPagination />
            </div>
        </div>

        <div>
            <slot />
        </div>

        <SectionsCommonFindUs />
    </section>
</template>

<script setup>
const props = defineProps(['title']);
const { title } = props;

const productsFilterStore = useProductsFilterStore();
const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
})
</script>