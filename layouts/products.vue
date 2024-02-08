<template>
    <section>
        <SectionsCommonBreadrumbs v-if="breadcrumbs && breadcrumbs.length" :breadcrumbs="breadcrumbs" />

        <h1 class="uppercase">{{ title }}</h1>

        <div class="mt-10 flex gap-10">
            <SectionsProductsSidebar />
            <div class="w-full lg:w-3/4 xl:w-full">
                <SectionsProductsCategories />

                <button @click="productsFilterStore.toggleMenuIsOpen" class="my-10 underline text-2xl lg:hidden">{{ $t('filtering') }} / {{ $t('sorting') }}</button>

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
const props = defineProps(['title', 'breadcrumbs']);
const { title, breadcrumbs } = props;

const productsFilterStore = useProductsFilterStore();
const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
})
</script>