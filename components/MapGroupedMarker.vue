<template>
    <LMarker :lat-lng="[location.latitude, location.longitude]" :icon="mapMarkerIcon" />
</template>

<script setup lang="ts">
import MapGroupedMarkerIcon from '~/components/MapGroupedMarkerIcon.vue';
import { render } from 'vue';
import type { ILocation } from '~/types';

const { location } = defineProps(['location']);

const markerIcon = ref(renderMarker());
const mapMarkerIcon = ref(getMarker());

function renderMarker() {
    const counters = {
        "USE": {
            locationsNumber: 0,
            servicesNumber: 0,
        },
        "ZSEU": {
            locationsNumber: 0,
            servicesNumber: 0,
        },
    };

    location.items.forEach((item: ILocation) => {
        if(item.type === 'USE') {
            counters.USE.locationsNumber++;
            counters.USE.servicesNumber++;
        }else {
            counters.ZSEU.locationsNumber++;
            counters.ZSEU.servicesNumber += item.zseu_count;
        }
    });

    const vnode = h(MapGroupedMarkerIcon, {
        counters: counters,
        location: location,
        markerSize: 60,
    });
    const container = document.createElement('div');

    render(vnode, container);

    return container.innerHTML;
}

function getMarker() {
    return L.divIcon({
        className: 'map-marker-icon',
        html: markerIcon.value,
    });
}

</script>