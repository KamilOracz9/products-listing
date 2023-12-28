<template>
    <div class="marker" :style="`transform: translateY(-${markerSize}px);`">
        <div class="marker__data" :style="`display: ${open ? 'block' : 'none'}`">
            <div v-for="number in numbers" v-text="number"></div>
        </div>
        <div class="marker__counter">{{ counter }}</div>
        <svg class="loaction-icon" :width="markerSize" :height="markerSize" v-if="location.type === 'USE'">
            <rect width="300" height="100" stroke="black" stroke-width=".5" :fill="colors[color(location.expired_status_id)]" />
        </svg>
        <svg class="loaction-icon" :width="markerSize" :height="markerSize" v-if="location.type === 'ZSEU'">
            <circle :cx="markerSize / 2" :cy="markerSize / 2" :r="markerSize / 2" stroke="black" stroke-width=".5"
                :fill="colors[color(location.expired_status_id)]" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import type { IExpiredStatusId, ILocation } from '~/types';

const props = defineProps(['counter', 'numbers', 'open', 'location']);

const numbers: Ref<Array<string>> = ref(props.numbers);
const open: Ref<boolean> = ref(props.open);
const counter: Ref<number> = ref(props.counter);
const location: Ref<ILocation> = ref(props.location);

const markerSize = 25;
const colors = {
    'green': '#0a8d11',
    'yellow': '#F2EB1D',
    'red': '#DB261A',
    'black': '#000',
};

const color = (expiredStatusId: IExpiredStatusId) => {
    switch (expiredStatusId) {
        case 0: return 'green';
        case 1: return 'yellow';
        case 2: return 'red';
        default: return 'black';
    }
}

</script>
