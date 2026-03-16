<template>
    <ul class="flex flex-col gap-8">
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
