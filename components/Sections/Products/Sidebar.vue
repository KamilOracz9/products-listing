<template>
    <form ref="formRef" :class="productsFilterStore.isOpen ? '' : 'hidden'"
        class="fixed p-5 top-0 left-0 bg-white w-full h-screen overflow-y-auto z-40 flex-col pb-10 lg:pb-0 lg:h-fit lg:overflow-hidden lg:p-0 lg:!flex lg:relative lg:z-0 lg:w-[250px]">
        <div class="text-[1.25rem] flex justify-between lg:hidden">
            <span class="underline">{{ $t('filtering') }} / {{ $t('sorting') }}</span>
            <button type="button" class="lg:hidden" @click="toggleMenuIsOpen">
                <img src="@/assets/icons/close.svg" alt="">
            </button>
        </div>
        <div>
            <button @click="resetFilters" type="button" class="text-lg my-6 lg:mt-0 lg:text-2xl">
                {{ $t('reset-filters') }}
            </button>
        </div>

        <div class="flex flex-col gap-8 text-sm" v-if="data">
            <SectionsSidebarFiltersList :filters="data" />
            <SectionsSidebarDimensions :filters="data.dimensions" />
        </div>
        <div class="mt-6 w-fit ml-auto">
            <!-- <ButtonsTransparent tagType="button" :label="$t('filter')" type="submit" /> -->
            <ButtonsTransparent type="submit" tagType="button" :label="$t('filter')" @click="toggleMenuIsOpen" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchFilters } from '~/services/api';

const productsFilterStore = useProductsFilterStore();
const globalStore = useGlobalStore();
const { toggleMenuIsOpen } = reactive(productsFilterStore);
const route = useRoute();
const categoryId = computed(() => globalStore.header?.products.items.categories.filter(category => category.slug === route.params.category)[0].id);

const resetFilters = async () => {
    await navigateTo({ query: {} });
    refresh();
}

const { data, refresh } = await useAsyncData(DataKeys.FILTERS_LIST, () => fetchFilters({}))

provide('refresh', refresh);
</script>