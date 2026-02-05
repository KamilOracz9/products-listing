<template>
    <section class="relative w-full lg:col-span-3" id="place-to-buy" ref="sectionRef">
        <div class="w-full map h-[400px] relative z-10 lg:h-[700px]" id="map"></div>
        <div
            class="map-hint hidden transition-all absolute top-0 left-0 w-full h-full items-center justify-center z-10 bg-[rgba(0,0,0,.3)] text-lg text-white opacity-0 lg:flex">
            {{ $t('pages.place-to-buy.map-hint') }}</div>
    </section>
</template>

<script setup>
import markerIcon from '@/assets/icons/marker-icon-yellow.png';
import markerIconRed from '@/assets/icons/marker-icon-red.png';
import { fetchCoordsList } from '~/services/api';
import { DataKeys } from '~/enums/dataKeys';

const route = useRoute();
const zoom = inject('mapZoom');
const center = inject('mapCenter');
const selected = inject('selected');
const locationsIds = inject('locationsIds');

const sectionRef = ref();
const locationsIdsByZoom = ref({});
let map = null;
let markers = null;
let L = null;
let MarkerClusterGroup = null;

const { data } = await useAsyncData(DataKeys.COORDS_LIST, async () => fetchCoordsList(route.query, getLocaleIso(), locationsIds.value), { watch: [() => route.query, locationsIds] });

const initMap = async () => {
    if (!L) {
        L = await import('leaflet');
        const cluster = await import('leaflet.markercluster');
        MarkerClusterGroup = cluster.MarkerClusterGroup;
    }

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
        zoomSnap: 3,
    });

    const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
    layer.addTo(map);

    markers = new MarkerClusterGroup({
        iconCreateFunction: function (cluster) {
            var childMarkers = cluster.getAllChildMarkers();
            var html = '<div class="group-marker">' + childMarkers.length + '</div>';
            return L.divIcon({ html: html });
        },
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: false,
        disableClusteringAtZoom: 13,
    });

    map.addLayer(markers);

    // Handle zoom events
    map.on('zoomend', function (event) {
        const currentZoom = event.sourceTarget.getZoom();
        const savedIds = locationsIdsByZoom.value[currentZoom];

        if (savedIds && savedIds.length > 0) {
            locationsIds.value = savedIds;
        } else if (currentZoom <= 6) {
            locationsIds.value = [];
        }

        // Clean up old zoom levels
        Object.keys(locationsIdsByZoom.value).forEach(zoomLevel => {
            if (parseInt(zoomLevel) <= currentZoom - 3) {
                delete locationsIdsByZoom.value[zoomLevel];
            }
        });
    });

    // Handle cluster clicks
    markers.on('clusterclick', function (event) {
        const newZoom = Math.min(map.getZoom() + 3, 18);
        const clusterIds = event.layer.getAllChildMarkers().map(marker => marker.options.id);
        
        // Store the filtered IDs for the new zoom level
        locationsIdsByZoom.value[newZoom] = clusterIds;

        map.flyTo([event.latlng.lat, event.latlng.lng], newZoom, {
            animate: true,
            duration: 0.5,
        });
    });

    setupZoomControls();
};

const createIcons = () => {
    const icon = L.icon({
        iconUrl: markerIcon,
        iconSize: [23, 31],
    });

    const iconRed = L.icon({
        iconUrl: markerIconRed,
        iconSize: [23, 31],
    });

    return { icon, iconRed };
};

const refreshMarkers = () => {
    if (!markers || !L || !data.value) return;

    markers.clearLayers();
    const { icon, iconRed } = createIcons();

    data.value.forEach(({ lat, lon, id }) => {
        if (!lat || !lon) return;

        const markerIcon = selected.value === id ? iconRed : icon;
        const marker = L.marker([lat, lon], { icon: markerIcon, id });

        marker.addEventListener('click', () => {
            selected.value = id;
        });

        markers.addLayer(marker);
    });
};

const setupZoomControls = () => {
    nextTick(() => {
        const zoomIn = document.querySelector('.leaflet-control-zoom-in');
        const zoomOut = document.querySelector('.leaflet-control-zoom-out');
        
        if (zoomIn) {
            zoomIn.removeEventListener('click', handleZoomIn);
            zoomIn.addEventListener('click', handleZoomIn);
        }
        if (zoomOut) {
            zoomOut.removeEventListener('click', handleZoomOut);
            zoomOut.addEventListener('click', handleZoomOut);
        }
    });
};

const handleZoomIn = () => map?.zoomIn(3);
const handleZoomOut = () => map?.zoomOut(3);

const removeMapHint = (event) => {
    event.preventDefault();
    const hint = event.currentTarget.querySelector('.map-hint');
    if (hint) {
        hint.remove();
        event.currentTarget.removeEventListener('wheel', removeMapHint);
        event.currentTarget.removeEventListener('mouseleave', removeMapHint);
        event.currentTarget.removeEventListener('click', removeMapHint);
    }
};

// Watchers
watch([center, zoom], ([newCenter, newZoom]) => {
    if (map) {
        map.setView(newCenter, newZoom);
    }
});

watch(selected, () => {
    refreshMarkers();
});

watch(data, () => {
    refreshMarkers();
}, { deep: true });

onMounted(async () => {
    await initMap();
    refreshMarkers();

    if (sectionRef.value) {
        sectionRef.value.addEventListener('wheel', removeMapHint);
        sectionRef.value.addEventListener('mouseleave', removeMapHint);
        sectionRef.value.addEventListener('click', removeMapHint);
    }
});

onUnmounted(() => {
    if (map) {
        map.remove();
        map = null;
        markers = null;
    }
});
</script>

<style>
#place-to-buy:hover>.map-hint {
    opacity: 1;
}
</style>