<template>
    <input :name="`${dimension.name}_${type}`" ref="input" @change="onChange" @input="onInput" :min="dimension.min"
        :max="dimension.max"
        :value="type === 'min' ? dimension.min : dimension.max" step="1" :type="inputType">
</template>

<script setup>
import debounce from 'debounce';

const props = defineProps(['dimension', 'type', 'inputType']);

const { dimension, type, inputType } = toRefs(props);

const productsFilterStore = useProductsFilterStore();
const router = useRouter();

const input = ref(null);

const onChange = () => {
    if (inputType.value === 'number') return;

    validate();
    setDimension();
}

const onInput = debounce(() => {
    if (inputType.value === 'range') return;

    validate();
    setDimension();
}, 1000)

// console.log(dimension.value.name)

const validate = () => {
    // console.log(dimension.value)
    const value = parseInt(input.value.value);
    const minValue = parseInt(dimension.value.min);
    const maxValue = parseInt(dimension.value.max);
    const activeMinValue = parseInt(dimension.value.min);
    const activeMaxValue = parseInt(dimension.value.max);
    // const value = parseInt(input.value.value);
    // const minValue = parseInt(productsFilterStore.filtersDimensions[dimension.label].min);
    // const maxValue = parseInt(productsFilterStore.filtersDimensions[dimension.label].max);
    // const activeMinValue = parseInt(productsFilterStore.activeFiltersDimensions[dimension.label].min);
    // const activeMaxValue = parseInt(productsFilterStore.activeFiltersDimensions[dimension.label].max);

    if (value > activeMaxValue && type.value === 'min') input.value.value = activeMaxValue - 10;
    else if (value < activeMinValue && type.value === 'max') input.value.value = activeMinValue + 10;
    else if (value < minValue) input.value.value = minValue;
    else if (value > maxValue) input.value.value = maxValue;
    else if ((!value || value == 0) && type.value === 'min') input.value.value = minValue;
    else if (!value && type.value === 'max') input.value.value = maxValue;
}

const setDimension = () => {
    const value = parseInt(input.value.value);
    const query = router.currentRoute.value.query;

    productsFilterStore.activeFiltersDimensions[dimension.value.name][type.value] = parseInt(input.value.value);

    const key = `${dimension.value.name}_${type.value}`;

    const params = {...query, ...{ [key]: value }};

    if (value === productsFilterStore.filtersDimensions[[dimension.value.name]][type.value]) delete params[key];

    navigateTo({ query: params });
};
</script>