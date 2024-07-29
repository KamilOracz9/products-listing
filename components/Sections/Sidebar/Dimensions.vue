<template>
    <ul class="flex flex-col gap-8">
        <!-- <li v-for="dimension in dimensions" class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ $t('dimension') }} - {{ $t(`filters.${dimension.name}`) }}</span>
            <div class="mb-4">
                <button @click="onResetClick(dimension.name)" :aria-label="$t('reset')">{{ $t('reset') }}</button>
            </div>
            <div class="range-slider relative h-[35px]">
                <SectionsSidebarSlider :dimension="dimension" :value="route.query[`${dimension.name}_min`] ?? dimension.min" type="min" inputType="range" />
                <SectionsSidebarSlider :dimension="dimension" :value="route.query[`${dimension.name}_max`] ?? dimension.max" type="max" inputType="range" />
            </div>
            <div class="flex gap-2 uppercase justify-start">
                <div class="flex items-center gap-2">
                    {{ $t('from') }}
                    <SectionsSidebarSlider :value="route.query[`${dimension.name}_min`] ?? dimension.min" :dimension="dimension" type="min" inputType="number"
                        class="min-w-[60px] h-[26px]" />
                </div>
                <div class="flex items-center gap-2">
                    {{ $t('to') }}
                    <SectionsSidebarSlider :value="route.query[`${dimension.name}_max`] ?? dimension.max" :dimension="dimension" type="max" inputType="number"
                        class="min-w-[60px] h-[26px]" />
                </div>
            </div>
        </li> -->
        <Dimension v-for="dimension in dimensions" :dimension="dimension" :onResetClick="onResetClick" />
    </ul>
</template>

<script setup>
import Dimension from './Dimension.vue';

const productsFilterStore = useProductsFilterStore();
const router = useRouter();
const props = defineProps(['filters']);
const { filters: dimensions } = toRefs(props);
const route = useRoute();

const onResetClick = (label) => {
    const { min, max } = dimensions.value[label];

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
