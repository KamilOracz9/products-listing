<template>
  <li class="flex flex-col gap-4 border-b border-gray-1 pb-4" v-if="dimension.min < dimension.max">
    <span class="font-medium uppercase">{{ $t('dimension') }} - {{ $t(`filters.${dimension.name}`) }}</span>
    <div class="mb-4">
      <button @click="onResetClick(dimension.name)" :aria-label="$t('reset')">{{ $t('reset') }}</button>
    </div>

    <div class="flex gap-2 uppercase justify-start">
      <input :name="`${dimension.name}`" :min="dimension.min" :max="dimension.max" type="number"
        class="min-w-[60px] max-w-[70px] h-[26px]" v-model="value">
    </div>
  </li>
</template>

<script setup lang="ts">
import debounce from 'debounce';

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

const initialValue = computed(() => {
  const queryValue = parseInt(
    router.currentRoute.value.query[`${dimension.value.name}`] as string
  );
  if (!isNaN(queryValue) && queryValue >= dimension.value.min && queryValue <= dimension.value.max) {
    return queryValue;
  }
  return null;
});

const value = ref<number | null>(initialValue.value);

const validate = (val: number) => {
  let newVal = parseInt(val as any);
  if (isNaN(newVal)) return null;
  if (newVal < dimension.value.min) newVal = dimension.value.min;
  if (newVal > dimension.value.max) newVal = dimension.value.max;
  return newVal;
};

const saveToQuery = (newValue: number | null) => {
  const query = { ...router.currentRoute.value.query };
  const key = dimension.value.name;

  if (newValue === null) {
    delete query[key];
  } else {
    query[key] = String(newValue);
  }

  navigateTo({ query });
};

const debouncedSave = debounce((val: number | null) => {
  const validated = val !== null ? validate(val) : null;
  value.value = validated;
  saveToQuery(validated);
}, DEBOUNCE_TIME);

watch(value, (val, _, onCleanup) => {
  debouncedSave(val);
  onCleanup(() => debouncedSave.clear?.());
});
</script>