<template>
    <input :name="`${dimension.label}_${type}`" ref="input" @change="onChange" @input="onInput" :min="productsFilterStore.filtersDimensions[dimension.label].min"
        :max="productsFilterStore.filtersDimensions[dimension.label].max"
        :value="productsFilterStore.activeFiltersDimensions[dimension.label][type]" step="1" :type="inputType">
</template>

<script setup>
import debounce from 'debounce';

const { dimension, type, inputType } = defineProps(['dimension', 'type', 'inputType']);

const productsFilterStore = useProductsFilterStore();
const router = useRouter();

const input = ref(null);

const onChange = () => {
    if (inputType === 'number') return;

    validate();
    setDimension();
}

const onInput = debounce(() => {
    if (inputType === 'range') return;

    validate();
    setDimension();
}, 1000)

const validate = () => {
    const value = parseInt(input.value.value);
    const minValue = parseInt(productsFilterStore.filtersDimensions[dimension.label].min);
    const maxValue = parseInt(productsFilterStore.filtersDimensions[dimension.label].max);
    const activeMinValue = parseInt(productsFilterStore.activeFiltersDimensions[dimension.label].min);
    const activeMaxValue = parseInt(productsFilterStore.activeFiltersDimensions[dimension.label].max);

    if (value > activeMaxValue && type === 'min') input.value.value = activeMaxValue - 10;
    else if (value < activeMinValue && type === 'max') input.value.value = activeMinValue + 10;
    else if (value < minValue) input.value.value = minValue;
    else if (value > maxValue) input.value.value = maxValue;
    else if ((!value || value == 0) && type === 'min') input.value.value = minValue;
    else if (!value && type === 'max') input.value.value = maxValue;
}

const setDimension = () => {
    const value = parseInt(input.value.value);
    const query = router.currentRoute.value.query;

    productsFilterStore.activeFiltersDimensions[dimension.label][type] = parseInt(input.value.value);

    const key = `${dimension.label}_${type}`;

    const params = {...query, ...{ [key]: value }};

    if (value === productsFilterStore.filtersDimensions[dimension.label][type]) delete params[key];

    navigateTo({ query: params });
};
</script>