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
</template>

<script setup lang="ts">
import debounce from 'debounce';

const MIN_MAX_DIFF = 0;
const DEBOUNCE_TIME = 1000;

const router = useRouter();
const props = defineProps<{
  dimension: {
    enabled: boolean;
    label: string;
    max: number;
    min: number;
    name: string;
    type: "range" | "number";
  },
  onResetClick: (label: string) => void;
}>();

const { dimension } = toRefs(props);

const initialMinValue = computed(() => {
  const queryValue = parseInt(
    router.currentRoute.value.query[`${dimension.value.name}_min[]`]
  );
  if (queryValue > dimension.value.min && queryValue <= dimension.value.max - MIN_MAX_DIFF) {
    return queryValue;
  }
  return dimension.value.min;
});

const initialMaxValue = computed(() => {
  const queryValue = parseInt(
    router.currentRoute.value.query[`${dimension.value.name}_max[]`]
  );
  if (queryValue < dimension.value.max && queryValue >= dimension.value.min + MIN_MAX_DIFF) {
    return queryValue;
  }
  return dimension.value.max;
});

const minValue = ref(initialMinValue.value);
const maxValue = ref(initialMaxValue.value);

const saveToQuery = (type: 'min[]' | 'max[]', newValue: number) => {
  const query = router.currentRoute.value.query;
  const key = `${dimension.value.name}_${type}`;
  const params = { ...query, [key]: newValue };

  navigateTo({ query: params });
};

const validateMin = (val: number) => {
  let newVal = parseInt(val as any);
  if (newVal > maxValue.value - MIN_MAX_DIFF) newVal = maxValue.value - MIN_MAX_DIFF;
  if (newVal < dimension.value.min) newVal = dimension.value.min;
  return newVal;
};

const validateMax = (val: number) => {
  let newVal = parseInt(val as any);
  if (newVal < minValue.value + MIN_MAX_DIFF) newVal = minValue.value + MIN_MAX_DIFF;
  if (newVal > dimension.value.max) newVal = dimension.value.max;
  return newVal;
};

const debouncedRangeMin = debounce((val: number) => {
  const validated = validateMin(val);
  minValue.value = validated;
  saveToQuery('min[]', validated);
}, DEBOUNCE_TIME);

const debouncedRangeMax = debounce((val: number) => {
  const validated = validateMax(val);
  maxValue.value = validated;
  saveToQuery('max[]', validated);
}, DEBOUNCE_TIME);

const debouncedNumberMin = debounce((val: number) => {
  const validated = validateMin(val);
  minValue.value = validated;
  saveToQuery('min[]', validated);
}, DEBOUNCE_TIME);

const debouncedNumberMax = debounce((val: number) => {
  const validated = validateMax(val);
  maxValue.value = validated;
  saveToQuery('max[]', validated);
}, DEBOUNCE_TIME);

watch(minValue, (val, _, onCleanup) => {
  if (dimension.value.type === 'range') {
    debouncedRangeMin(val);
    onCleanup(() => debouncedRangeMin.clear?.());
  } else {
    debouncedNumberMin(val);
    onCleanup(() => debouncedNumberMin.clear?.());
  }
});

watch(maxValue, (val, _, onCleanup) => {
  if (dimension.value.type === 'range') {
    debouncedRangeMax(val);
    onCleanup(() => debouncedRangeMax.clear?.());
  } else {
    debouncedNumberMax(val);
    onCleanup(() => debouncedNumberMax.clear?.());
  }
});
</script>
