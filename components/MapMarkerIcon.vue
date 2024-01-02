<template>
    <div :class="`relative w-fit h-[40px] loaction-icon -translate-y-full marker`">
        <div class="marker__data" :style="`display: ${open ? 'block' : 'none'}`">
            <div v-for="number in numbers" v-text="number"></div>
        </div>
        <div class="flex flex-col absolute w-full h-1/2 top-[40%] left-0 items-center justify-between z-10" :class="`text-[11px]`">
            <div class="flex items-center">{{ counter }}</div>
        </div>
        <img :class="`loaction-icon w-full h-[40px]`" :src="`/assets/icons/${location.type.toLocaleLowerCase()}_${color(location.expired_status_id)}.svg`" alt="">
    </div>
</template>

<script setup lang="ts">
import type { IExpiredStatusId, ILocation } from '~/types';

const props = defineProps(['counter', 'numbers', 'open', 'location', 'markerSize']);

const numbers: Ref<Array<string>> = ref(props.numbers);
const open: Ref<boolean> = ref(props.open);
const counter: Ref<number> = ref(props.counter);
const location: Ref<ILocation> = ref(props.location);

const color = (expiredStatusId: IExpiredStatusId) => {
    switch (expiredStatusId) {
        case 0: return 'green';
        case 1: return 'yellow';
        case 2: return 'red';
        default: return 'black';
    }
}
</script>
