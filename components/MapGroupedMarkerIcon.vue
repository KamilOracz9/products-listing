<template>
    <div :class="`relative w-fit h-[60px] -translate-y-full`" v-if="counters.USE.locationsNumber || counters.ZSEU.locationsNumber">
        <div class="flex flex-col absolute w-full h-1/2 top-[16%] left-0 items-center justify-between z-10" :class="`text-[11px]`">
            <div class="flex items-center">{{ counters.ZSEU.locationsNumber }} / {{ counters.ZSEU.servicesNumber }}</div>
            <div class="flex items-center">{{ counters.USE.locationsNumber }} / {{ counters.USE.servicesNumber }}</div>
        </div>
        <img class="loaction-icon w-full h-full" src="/assets/icons/grouped.svg" alt="">
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['counters', 'markerSize']);

const counters = ref(props.counters);
</script>
