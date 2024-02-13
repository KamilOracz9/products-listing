<template>
    <img src="@/assets/icons/arrow.svg" :style="styleObject"
        :width="width" :height="height" alt="arrow" title="arrow" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    width?: number;
    height?: number;
    direction?: 'left' | 'right' | 'upper' | 'down';
}>(), {
    width: 16,
    height: 24,
    direction: 'down',
})

const { width, height, direction } = toRefs(props);

const angle = computed(() => {
    switch (direction.value) {
        case 'left': return 90;
        case 'right': return 270;
        case 'upper': return 180;
        case 'down': return 0;
        default: return 0
    }
});

const translate = computed(() => {
    switch (direction.value) {
        case 'left': return '-10%, 0';
        case 'right': return '10%, 0';
        case 'upper': return '0, 10%';
        case 'down': return '0, -10%';
        default: return '0, 0';
    }
});

const styleObject = computed(() => ({
    aspect: `auto ${width.value} / ${height.value}`,
    transform: `rotate(${angle.value}deg) translate(${translate.value})`,
}))

</script>