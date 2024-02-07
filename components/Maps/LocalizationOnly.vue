<template>
    <section class="mt-10 w-full h-[400px] relative z-10" id="map"></section>
</template>

<script setup>
import markerIcon from '@/assets/icons/marker-icon-red.png';

const zoom = ref(12);
const center = ref([51.3788751, 21.0808941]);

const icon = L.icon({
    iconUrl: markerIcon,
    iconSize: [23, 31],
});

const marker = L.marker(center.value, { icon: icon });

const layer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png');

onMounted(async () => {
    const L = await import('leaflet')
    const { GestureHandling } = await import('leaflet-gesture-handling')

    L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

    const map = L.map("map", {
        center: center.value,
        zoom: zoom.value,
        maxZoom: 18,
        minZoom: zoom.value,
        gestureHandling: true,
    });

    layer.addTo(map);
    marker.addTo(map);
    map.scrollWheelZoom.disable();
})
</script>