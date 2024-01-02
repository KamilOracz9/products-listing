<template>
  <MainLayout>
    <LMap ref="map" :zoom="zoom" :center="center" :min-zoom="7" @update:zoom="(value) => zoomUpdated(value)">
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

const zoom: Ref<number> = ref(7);
const center: Ref<PointExpression> = ref([51.919438, 19.14513599999998]);
const locations: Ref<ILocation[]> = ref([]);
const groupedLocations: Ref<IGroupedLocation[]> = ref([]);

const zoomUpdated = (value: number) => {
  if(zoom.value !== value) globalStore.groupedMode = value <= 7;

  zoom.value = value;
};

onMounted(async () => {
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