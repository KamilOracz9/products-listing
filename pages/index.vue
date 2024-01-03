<template>
  <MainLayout>
    <LMap @load="handleMapLoad" ref="map" :zoom="zoom" :center="center" :min-zoom="7" @update:zoom="(value) => zoomUpdated(value)" :options="mapOptions">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
      <MapMarker v-if="!locationsStorage.isLoading && !globalStore.groupedMode" v-for="location in locations" :location="location"></MapMarker>
      <MapGroupedMarker v-if="!locationsStorage.isLoading && globalStore.groupedMode" v-for="location in groupedLocations" :location="location"></MapGroupedMarker>
    </LMap>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import MapMarker from '~/components/MapMarker.vue';
import MapGroupedMarker from '~/components/MapGroupedMarker.vue';
import type { PointExpression } from 'leaflet';
import type { IGroupedLocation, ILocation } from '~/types';
import isArrayEqual from 'lodash/isEqual';

const locationsStorage = useLocationsStore();
const globalStore = useGlobalStore();

const map = ref(null);
const zoom: Ref<number> = ref(7);
const center: Ref<PointExpression> = ref([51.919438, 19.14513599999998]);
const locations: Ref<ILocation[]> = ref([]);
const groupedLocations: Ref<IGroupedLocation[]> = ref([]);

const mapOptions = {
    scrollWheelZoom: true, // Wyłącz domyślną obsługę zoomu za pomocą kółka myszy
};

const zoomUpdated = (value: number) => {
  if(zoom.value !== value) globalStore.groupedMode = value <= 7;

  zoom.value = value;

  // console.log('asda');
};

// const handleZoom = () => {
//   // Tutaj możesz dostosować czułość zooma lub podejmować inne działania po zdarzeniu zoomu
//   console.log('Zdarzenie zoomu!');
// };

// const handleMapLoad = () => {
//   // Dodaj nasłuchiwanie zdarzeń kółka myszy do obsługi zoomu
//   console.log('asd');
//   if (map.value) {
//     map.value.mapObject.on('zoomend', handleZoom);
//   }
// };

onMounted(async () => {
  // map.value.root.addEventListener('zoomed', () => {
  //   console.log('asd');
  // })

  // console.log(map.value.root);

  // console.log(map.value.mapObject.on('zoomend', handleZoom));

  await locationsStorage.fetchLocations();
  locations.value = locationsStorage.activeLocations;
  groupedLocations.value = locationsStorage.groupedActiveLocations;

  globalStore.groupedMode = zoom.value <= 7;

  watch(locationsStorage, async (newValue) => {
    if (!isArrayEqual(locations.value, newValue.activeLocations)) {
      locationsStorage.isLoading = true;

      locations.value = locationsStorage.activeLocations;
      groupedLocations.value = locationsStorage.groupedActiveLocations;

      await nextTick();

      locationsStorage.isLoading = false;
    }
  });
});

</script>