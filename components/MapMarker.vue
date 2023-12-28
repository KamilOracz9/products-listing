<template>
    <LMarker :lat-lng="[location.address.delivery_latitude, location.address.delivery_longitude]" :icon="mapMarkerIcon" @click="toggleData" />
</template>

<script setup lang="ts">
import { getMarker } from '~/libs/osm/services';
import type { ILocation } from '~/types';
import MapMarkerIcon from '~/components/MapMarkerIcon.vue';
import { render } from 'vue';

const locationStore = useLocationsStore();
const filtersStore = useFiltersStore();
const { location } = defineProps({
    location: {} as ILocation,
});
const open = ref(false);

const toggleData = () => {
    const svg = (<HTMLElement>(<Event>event).target).closest('.loaction-icon');
    if (svg && svg.classList.contains('loaction-icon')) {
        const markerData = (<HTMLElement>svg.closest('.marker')?.querySelector('.marker__data'));

        locationStore.setActiveLocation(location.id);
        open.value = !open.value;
        filtersStore.closeAllData();
        markerData.style.display = open.value ? 'block' : 'none';
    };
}

const markerScheme = {
    counter: location.zseu_count,
    numbers: [
        `Numer: ${location.name}`,
        `Trasa: ${location.route_name ?? 'brak'}`,
        `Typ: ${location.type}`,
    ],
    open: open,
    location: location,
};

const markerIcon = ref();

const vnode = h(MapMarkerIcon, markerScheme);
const container = document.createElement('div');
render(vnode, container);
markerIcon.value = container.innerHTML;

const marker = L.divIcon({
    className: 'map-marker-icon',
    html: markerIcon,
});
// const marker = L.divIcon({
//     className: 'map-marker-icon',
//     html: getMarker(markerScheme),
// });

const mapMarkerIcon = ref(marker);

// onMounted(() => {
//     watch(open, () => {
//         filtersStore.closeAllData();

//         mapMarkerIcon.value = L.divIcon({
//             className: 'map-marker-icon',
//             html: getMarker(markerScheme),
//         });
//     })
// })
</script>