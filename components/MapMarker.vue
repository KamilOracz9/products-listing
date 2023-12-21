<template>
    <LMarker :lat-lng="[location.address.delivery_latitude, location.address.delivery_longitude]" :icon="mapMarkerIcon"
        @click="toggleData" />
</template>

<script setup lang="ts">
import { getMarker } from '~/libs/osm/services';
import type { ILocation } from '~/types';

const locationStore = useLocationsStore();
const { location } = defineProps({
    location: {} as ILocation,
});
const open = ref(false);

const markerScheme = {
    counter: location.zseu_count,
    numbers: [
        `Numer: ${location.name}`,
        `Trasa: ${location.route_name ?? 'brak'}`,
        `Typ: ${location.type}`,
    ],
    open: open,
    location: location
};

const marker = L.divIcon({
    className: 'map-marker-icon',
    html: getMarker(markerScheme),
});

const mapMarkerIcon = ref(marker);

const toggleData = () => {
    const svg = (<HTMLElement>(<Event>event).target).closest('.loaction-icon');
    if (svg && svg.classList.contains('loaction-icon')) {
        locationStore.setActiveLocation(location.id);
        open.value = !open.value;
    };
}

onMounted(() => {
    watch(open, () => {
        // filtersStore.closeAllData();

        mapMarkerIcon.value = L.divIcon({
            className: 'map-marker-icon',
            html: getMarker(markerScheme),
        });
    })
})
</script>