<template>
    <div ref="formRef" :class="productsFilterStore.isOpen ? '' : 'hidden'"
        class="fixed px-5 pb-5 top-0 left-0 bg-white w-full h-screen overflow-y-auto z-40 flex-col lg:pb-0 lg:h-fit lg:overflow-hidden lg:p-0 lg:!flex lg:relative lg:z-0 lg:w-min lg:min-w-[200px]">
        <div class="text-[1.25rem] flex fixed bg-white z-10 py-5 w-[calc(100%-2.5rem)] justify-between lg:hidden">
            <span class="underline">{{ $t('filtering') }}</span>
            <button type="button" class="lg:hidden" :aria-label="$t('filtering')" @click="toggleMenuIsOpen">
                <img src="@/assets/icons/close.svg" alt="">
            </button>
        </div>
        <div>
            <button @click="resetFilters" type="button" :aria-label="$t('reset-filters')"
                class="text-lg mb-6 lg:mt-0 lg:text-2xl">
                {{ $t('reset-filters') }}
            </button>
        </div>

        <div class="flex flex-col gap-8 text-sm relative" v-if="data && !pending">
            <SectionsSidebarFiltersList :filters="data.filters" :allFilters="data.allFilters" :labels="data.labels" />
            <SectionsSidebarDimensions :filters="data.dimensions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchFilters } from '~/services/api/products';
const { $locale, $baseUrl } = useNuxtApp();

// const refresh = inject('filtersRefresh');
const route = useRoute();
const localePath = useLocalePath();

const data = inject('filtersData');
const pending = inject('filtersPending');
const refreshProducts = inject('refreshProducts');

const productsFilterStore = useProductsFilterStore();
const { toggleMenuIsOpen } = reactive(productsFilterStore);

const resetFilters = async () => {
    try {
        await navigateTo(`${localePath(route.name.split('___'))}/`);
        // Refresh products after filter reset
        if (refreshProducts) {
            await refreshProducts();
        }
    } catch (error) {
        console.error('Error resetting filters:', error);
    }
}

// provide('refresh', refresh);
</script>