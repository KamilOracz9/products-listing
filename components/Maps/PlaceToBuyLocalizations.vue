<template>
    <section class="w-full map h-[400px] relative z-10 lg:col-span-3 lg:h-[700px]" id="map"></section>
</template>

<script setup>
import markerIcon from '@/assets/icons/marker-icon-yellow.png';
import markerIconRed from '@/assets/icons/marker-icon-red.png';
const placeToBuyStore = usePlaceToBuyStore();

const zoom = inject('mapZoom');
const center = inject('mapCenter');
const selected = inject('selected');

let map = null;

const icon = L.icon({
    iconUrl: markerIcon,
    iconSize: [23, 31],
});

const iconRed = L.icon({
    iconUrl: markerIconRed,
    iconSize: [23, 31],
});

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');

const mount = async () => {
    const L = await import('leaflet');
    const { MarkerClusterGroup } = await import('leaflet.markercluster');
    const { GestureHandling } = await import('leaflet-gesture-handling');

    L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
    L.Map.addInitHook("addHandler", "markerClusterGroup", MarkerClusterGroup);

    const container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    map = L.map("map", {
        center: center.value,
        zoom: zoom.value,
        maxZoom: 18,
        minZoom: 6,
        gestureHandling: true,
        // zoomSnap: 1,
        // zoomDelta: 1,
        // wheelPxPerZoomLevel: 200,
    });

    layer.addTo(map);
    map.scrollWheelZoom.disable();
}

const drawPoints = () => {
    const markers = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            var markers = cluster.getAllChildMarkers();
            var html = '<div class="group-marker">' + markers.length + '</div>';
            return L.divIcon({ html: html });
        },
        spiderfyOnMaxZoom: false, showCoverageOnHover: true, zoomToBoundsOnClick: false
    });

    placeToBuyStore.locations.items.forEach(({ coords }, index) => {
        markers.addLayer(L.marker([coords.lat, coords.lng], { icon: selected.value === index ? iconRed : icon }));
    });

    map.addLayer(markers);
}

onMounted(() => mount().then(() => {
    drawPoints();
}))
</script>