
<template>
    <ul class="flex flex-col gap-8">
        <li v-for="dimension in [width, height, depth]" class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ $t('dimension') }} - {{ $t(dimension.label) }}</span>
            <div class="mb-4">
                <button @click="onResetClick(dimension.label)">{{ $t('reset') }}</button>
            </div>
            <div class="range-slider relative h-[35px]">
                <SectionsSidebarSlider :dimension="dimension" type="min" inputType="range" />
                <SectionsSidebarSlider :dimension="dimension" type="max" inputType="range" />
            </div>
            <div class="flex gap-2 uppercase justify-start">
                <div class="flex items-center gap-2">
                    {{ $t('from') }}
                    <SectionsSidebarSlider :dimension="dimension" type="min" inputType="number"
                        class="min-w-[60px] h-[26px]" />
                </div>
                <div class="flex items-center gap-2">
                    {{ $t('to') }}
                    <SectionsSidebarSlider :dimension="dimension" type="max" inputType="number"
                        class="min-w-[60px] h-[26px]" />
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>
const productsFilterStore = useProductsFilterStore();
const router = useRouter();

const { width, height, depth } = reactive(productsFilterStore.filtersDimensions);

const onResetClick = (label) => {
    const { min, max } = productsFilterStore.filtersDimensions[label];

    productsFilterStore.activeFiltersDimensions[label].min = min;
    productsFilterStore.activeFiltersDimensions[label].max = max;

    const query = router.currentRoute.value.query;

    const keys = [`${label}_min`, `${label}_max`];

    const params = { ...query };

    keys.forEach(key => {
        delete params[key];
    });

    navigateTo({ query: params });
}
</script>
