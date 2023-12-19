<template>
    <LMarker :lat-lng="[location.address.delivery_latitude, location.address.delivery_longitude]" :icon="mapMarkerIcon" @click="toggleData" />
</template>

<script setup>
import { getMarker } from '~/libs/osm/services';

const props = defineProps({
    location: Object,
});

const { location } = props;
console.log(location);
const open = ref(false);
const mapMarkerIcon = ref(
    L.divIcon({
        className: 'map-marker-icon',
        html: getMarker({
            markerSize: 25,
            counter: 10,
            numbers: [
                'TR/23/003100',
                'TR/23/003100',
                'TR/23/003100',
            ],
            open: open,
        }).mapMarker,
    })
);

const toggleData = () => {
    const svg = event.target.closest('.loaction-icon');
    if(svg && svg.classList.contains('loaction-icon')) open.value = !open.value;
}

onMounted(() => {
    watch(open, () => {
        mapMarkerIcon.value = L.divIcon({
            className: 'map-marker-icon',
            html: getMarker({
                markerSize: 25,
                counter: 10,
                numbers: [
                    'TR/23/003100',
                    'TR/23/003100',
                    'TR/23/003100',
                ],
                open: open,
            }).mapMarker,
        });
    })
})
</script>