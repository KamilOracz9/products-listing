<template>
    <section>
        <SectionsCommonBreadrumbs v-if="breadcrumbs && breadcrumbs.length" :breadcrumbs="breadcrumbs" />

        <h1 class="uppercase text-[2rem] leading-[2.375rem] mt-0 mb-2 font-medium sm:text-[2.25rem] sm:leading-[2.75rem]">{{ title }}</h1>

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