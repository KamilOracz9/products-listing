<template>
    <div ref="formRef" :class="productsFilterStore.isOpen ? '' : 'hidden'"
        class="fixed p-5 top-0 left-0 bg-white w-full h-screen overflow-y-auto z-40 flex-col pb-10 lg:pb-0 lg:h-fit lg:overflow-hidden lg:p-0 lg:!flex lg:relative lg:z-0 lg:w-min lg:min-w-min">
        <div class="text-[1.25rem] flex justify-between lg:hidden">
            <span class="underline">{{ $t('filtering') }} / {{ $t('sorting') }}</span>
            <button type="button" class="lg:hidden" :aria-label="$t('filtering')" @click="toggleMenuIsOpen">
                <img src="@/assets/icons/close.svg" alt="">
            </button>
        </div>
        <div>
            <button @click="resetFilters" type="button" :aria-label="$t('reset-filters')"
                class="text-lg my-6 lg:mt-0 lg:text-2xl">
                {{ $t('reset-filters') }}
            </button>
        </div>

        <div class="flex flex-col gap-8 text-sm relative" v-if="data">
            <SectionsSidebarFiltersList :filters="data.filters" :allFilters="data.allFilters" :labels="data.labels" />
            <SectionsSidebarDimensions :filters="data.dimensions" />
        </div>
    </div>
</template>

<script setup lang="ts">
const data = inject('filtersData');
const refresh = inject('filtersRefresh');
const route = useRoute();
const localePath = useLocalePath();

const productsFilterStore = useProductsFilterStore();
const { toggleMenuIsOpen } = reactive(productsFilterStore);

const resetFilters = async () => {
    await navigateTo(`${localePath(route.name.split('___'))}/`);
    refresh();
}

provide('refresh', refresh);
</script>