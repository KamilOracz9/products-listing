<template>
    <li class="flex flex-col gap-4 border-b border-gray-1 pb-4">
        <span class="font-medium uppercase">{{ $t('dimension') }} - {{ $t(`filters.${dimension.name}`) }}</span>
        <div class="mb-4">
            <button @click="onResetClick(dimension.name)" :aria-label="$t('reset')">{{ $t('reset') }}</button>
        </div>
        <div class="range-slider relative h-[35px]">
            <input :name="`${dimension.name}_min[]`" :min="dimension.min" :max="dimension.max" step="1" type="range"
                v-model="minValue">
            <input :name="`${dimension.name}_max[]`" :max="dimension.max" :min="dimension.min" step="1" type="range"
                v-model="maxValue">
        </div>
        <div class="flex gap-2 uppercase justify-start">

            <div class="flex items-center gap-2">
                {{ $t('from') }}
                <input :name="`${dimension.name}_min[]`" :min="dimension.min" :max="dimension.max" type="number"
                    class="min-w-[60px] h-[26px]" v-model="minValue">
            </div>
            <div class="flex items-center gap-2">
                {{ $t('to') }}
                <input :name="`${dimension.name}_max[]`" :min="dimension.min" :max="dimension.max" type="number"
                    class="min-w-[60px] h-[26px]" v-model="maxValue">
            </div>
        </div>
    </li>
    <!-- <li class="flex flex-col gap-4 border-b border-gray-1 pb-4">
        <span class="font-medium uppercase">{{ $t('dimension') }} - {{ $t(`filters.${dimension.name}`) }}</span>
        <div class="mb-4">
            <button @click="onResetClick(dimension.name)" :aria-label="$t('reset')">{{ $t('reset') }}</button>
        </div>
        <div class="range-slider relative h-[35px]">
            <SectionsSidebarSlider :dimension="dimension" :value="route.query[`${dimension.name}_min`] ?? dimension.min"
                type="min" inputType="range" />
            <SectionsSidebarSlider :dimension="dimension" :value="route.query[`${dimension.name}_max`] ?? dimension.max"
                type="max" inputType="range" />
        </div>
        <div class="flex gap-2 uppercase justify-start">
            <div class="flex items-center gap-2">
                {{ $t('from') }}
                <SectionsSidebarSlider :value="route.query[`${dimension.name}_min`] ?? dimension.min"
                    :dimension="dimension" type="min" inputType="number" class="min-w-[60px] h-[26px]" />
            </div>
            <div class="flex items-center gap-2">
                {{ $t('to') }}
                <SectionsSidebarSlider :value="route.query[`${dimension.name}_max`] ?? dimension.max"
                    :dimension="dimension" type="max" inputType="number" class="min-w-[60px] h-[26px]" />
            </div>
        </div>
    </li> -->
</template>

<script setup lang="ts">
import debounce from 'debounce';

const router = useRouter();
const props = defineProps<{
    dimension: {
        enabled: boolean;
        label: string;
        max: number;
        min: number;
        name: string;
        type: "range" | "numner";
    },
    onResetClick: (label: string) => void;
}>();

const { dimension } = toRefs(props);

const initialMinValue = computed(() => {
    const queryValue = parseInt(router.currentRoute.value.query[`${dimension.value.name}_min[]`]);

    if(queryValue > dimension.value.min && queryValue <= dimension.value.max - 10) return queryValue;
    else return dimension.value.min;
});
const initialMaxValue = computed(() => {
    const queryValue = parseInt(router.currentRoute.value.query[`${dimension.value.name}_max[]`]);

    if(queryValue < dimension.value.max && queryValue >= dimension.value.min + 10) return queryValue;
    else return dimension.value.max;
});

const minValue = ref(initialMinValue.value);
const maxValue = ref(initialMaxValue.value);

const setDimensions = debounce((type: 'min[]' | 'max[]') => {
    const newValue = type === 'min[]' ? minValue.value : maxValue.value;

    const query = router.currentRoute.value.query;

    const key = `${dimension.value.name}_${type}`;

    const params = { ...query, ...{ [key]: newValue } };

    navigateTo({ query: params });
}, 1000)

watch(minValue, value => {
    const newValue = parseInt(value);

    if (newValue > maxValue.value - 10) minValue.value = maxValue.value - 10;
    else if (newValue < 0) minValue.value = 0;
    else if (newValue < minValue.value) minValue.value = minValue.value;

    setDimensions('min[]');
});

watch(maxValue, value => {
    const newValue = parseInt(value);

    if (newValue < minValue.value + 10) maxValue.value = minValue.value + 10;
    else if (newValue > maxValue.value) maxValue.value = dimension.value.max;
    else if (newValue > dimension.value.max) maxValue.value = dimension.value.max;

    setDimensions('max[]');
});
</script>
