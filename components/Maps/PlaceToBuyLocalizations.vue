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
const L = await import('leaflet');
const { MarkerClusterGroup } = await import('leaflet.markercluster');

const route = useRoute();

const zoom = inject('mapZoom');
const center = inject('mapCenter');
const selected = inject('selected');
const locationsIds = inject('locationsIds');

const icon = L.icon({
    iconUrl: markerIcon,
    iconSize: [23, 31],
});

const iconRed = L.icon({
    iconUrl: markerIconRed,
    iconSize: [23, 31],
});

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');

const sectionRef = ref();
const locationsIdsByZoom = ref([]);

const { data } = await useAsyncData(DataKeys.COORDS_LIST, async () => fetchCoordsList(route.query, locationsIds.value), { watch: [() => route.query, locationsIds] });

const map = computed(() => {
    const container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    };

    const map = L.map("map", {
        center: center.value,
        zoom: zoom.value,
        maxZoom: 18,
        minZoom: 6,
        gestureHandling: true,
        zoomSnap: 3,
    });

    map.on('zoomend', function (event) {
        const prevLocationsIds = locationsIdsByZoom.value[event.sourceTarget.getZoom()];

        if (prevLocationsIds) locationsIds.value = prevLocationsIds;
        else if (event.sourceTarget.getZoom() <= 6) locationsIds.value = [];

        delete locationsIdsByZoom.value[event.sourceTarget.getZoom() + 3];
    });

    layer.addTo(map);

    return map;
});

const markers = computed(() => {
    const markers = new MarkerClusterGroup({
        iconCreateFunction: function (cluster) {
            var markers = cluster.getAllChildMarkers();
            var html = '<div class="group-marker">' + markers.length + '</div>';
            return L.divIcon({ html: html });
        },
        spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: true
    });

    return markers;
});

const refreshMarkers = () => {
    markers.value.clearLayers();

    data.value.forEach(({ lat, lon, id }, index) => {
        const marker = L.marker([lat, lon], { icon: selected.value === id ? iconRed : icon, id });

        marker.addEventListener('click', () => {
            selected.value = id;
        })

        if (lat && lon) markers.value.addLayer(marker);
    });
}

const removeMapHint = (event) => {
    event.preventDefault();
    event.currentTarget.querySelector('.map-hint')?.remove();
    event.currentTarget.removeEventListener('wheel', removeMapHint, false);
    event.currentTarget.removeEventListener('mouseleave', removeMapHint);
};

watch(sectionRef, () => {
    document.querySelector('.leaflet-control-zoom-in').addEventListener('click', () => map.value.zoomIn(3));
    document.querySelector('.leaflet-control-zoom-out').addEventListener('click', () => map.value.zoomOut(3));
})

onMounted(() => {
    refreshMarkers();

    markers.value.on('clusterclick', function (event) {
        if (!locationsIdsByZoom.value) locationsIdsByZoom.value[map.value.getZoom() + 3] = [];
        locationsIdsByZoom.value[map.value.getZoom() + 3] = event.layer.getAllChildMarkers().map(child => (child.options.id));

        locationsIds.value = locationsIdsByZoom.value[map.value.getZoom() + 3].flat();

        map.value.zoomIn(3)
    });

    map.value.addLayer(markers.value);

    sectionRef.value.addEventListener('wheel', removeMapHint, false);
    sectionRef.value.addEventListener('mouseleave', removeMapHint);
    sectionRef.value.addEventListener('click', removeMapHint);

    watch(data, () => {
        refreshMarkers();
    })
})
</script>

<style>
#place-to-buy:hover>.map-hint {
    opacity: 1;
}
</style>