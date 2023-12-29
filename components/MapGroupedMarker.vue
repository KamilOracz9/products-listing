<template>
    <LMarker :lat-lng="[location.latitude, location.longitude]" :icon="mapMarkerIcon" @click="toggleData" />
</template>

<script setup lang="ts">
import MapGroupedMarkerIcon from '~/components/MapGroupedMarkerIcon.vue';
import { render } from 'vue';

const { location } = defineProps(['location']);

const locationStore = useLocationsStore();
const filtersStore = useFiltersStore();

const open = ref(false);
const markerIcon = ref(renderMarker());
const mapMarkerIcon = ref(getMarker());

const toggleData = () => {
    // const svg = (<HTMLElement>(<Event>event).target).closest('.loaction-icon');
    // if (svg && svg.classList.contains('loaction-icon')) {
    //     const markerData = (<HTMLElement>svg.closest('.marker')?.querySelector('.marker__data'));

    //     locationStore.setActiveLocation(location.id);
    //     open.value = !open.value;
    //     filtersStore.closeAllData();
    //     markerData.style.display = open.value ? 'block' : 'none';
    // };
}

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

    location.items.forEach(item => {
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
    });
    const container = document.createElement('div');

    render(vnode, container);

    return container.innerHTML;
}

function getMarker() {
    return L.divIcon({
        className: 'map-marker-icon',
        html: markerIcon,
    });
}

</script>