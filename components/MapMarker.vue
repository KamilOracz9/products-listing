<template>
    <LMarker :lat-lng="[location.address.delivery_latitude, location.address.delivery_longitude]" :icon="mapMarkerIcon"
        @click="toggleData" />
</template>

<script setup>
import { getMarker } from '~/libs/osm/services';

const locationStore = useLocationsStore();
const { location } = defineProps({
    location: {},
});
const open = ref(false);

const markerScheme = {
    counter: location.zseu_count,
    numbers: [
        `Numer: ${location.name}`,
        `Trasa: ${location.route_name ?? 'brak'}`,
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
    const svg = event.target.closest('.loaction-icon');
    if (svg && svg.classList.contains('loaction-icon')) {
        locationStore.activeLocationId = location.id;
        open.value = !open.value;
    };
}

onMounted(() => {
    watch(open, () => {
        locationStore.closeAllData();

        mapMarkerIcon.value = L.divIcon({
            className: 'map-marker-icon',
            html: getMarker(markerScheme),
        });
    })
})
</script>