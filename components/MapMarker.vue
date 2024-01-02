<template>
    <LMarker :lat-lng="[location.address.delivery_latitude, location.address.delivery_longitude]" :icon="mapMarkerIcon"
        @click="toggleData" />
</template>

<script setup lang="ts">
import MapMarkerIcon from '~/components/MapMarkerIcon.vue';
import { render } from 'vue';

const { location } = defineProps(['location']);

const locationStore = useLocationsStore();
const globalStore = useGlobalStore();

const open = ref(false);
const markerIcon = ref(renderMarker());
const mapMarkerIcon = ref(getMarker());

const toggleData = async () => {
    if(navigator.clipboard) navigator.clipboard.writeText(location.name);

    const icon = (<HTMLElement>(<Event>event).target).closest('.loaction-icon');

    if (icon && icon.classList.contains('loaction-icon')) {
        const markerData = (<HTMLElement>icon.closest('.marker')?.querySelector('.marker__data'));

        globalStore.closeAllData();
        await locationStore.setActiveLocation(location.id);
        open.value = !open.value;
        markerData.style.display = open.value ? 'block' : 'none';
    };
}

function renderMarker() {
    const vnode = h(MapMarkerIcon, {
        counter: location.zseu_count,
        numbers: [
            `Numer: ${location.name}`,
            `Trasa: ${location.route_name ?? 'brak'}`,
            `Typ: ${location.type}`,
        ],
        open: open,
        location: location,
        markerSize: 40,
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