<template>
    <section :class="productsFilterStore.isOpen ? '' : 'hidden'"
        class="fixed p-5 top-0 left-0 bg-white w-full h-screen overflow-y-auto z-40 flex-col pb-10 lg:pb-0 lg:h-fit lg:overflow-hidden lg:p-0 lg:!flex lg:relative lg:z-0 lg:w-[250px]">
        <div class="text-[1.25rem] flex justify-between lg:hidden">
            <span class="underline">{{ $t('filtering') }} / {{ $t('sorting') }}</span>
            <button class="lg:hidden" @click="productsFilterStore.toggleMenuIsOpen">
                <img src="@/assets/icons/close.svg" alt="">
            </button>
        </div>
        <div>
            <button class="text-lg my-6 lg:mt-0 lg:text-2xl">
                {{ $t('reset-filters') }}
            </button>
        </div>

        <div class="flex flex-col gap-8 text-sm">
            <SectionsSidebarFiltersList />
            <SectionsSidebarDimensions />
        </div>
    </section>
</template>

<script setup>
const productsFilterStore = useProductsFilterStore();

onMounted(() => {
    productsFilterStore.fetchFilters();
})
</script>