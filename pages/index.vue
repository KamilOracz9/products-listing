<template>
  <MainLayout>
    <LMap ref="map" :zoom="zoom" :center="center" @update:zoom="(value) => zoomUpdated(value)">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
      <MapMarker v-if="rerenderMarkers" v-for="location in locations" :location="location"></MapMarker>
    </LMap>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import MapMarker from '~/components/MapMarker.vue';
import type { PointExpression } from 'leaflet';
import type { ILocation } from '~/types';
import isArrayEqual from 'lodash/isEqual';
import MapMarkerIcon from '~/components/MapMarkerIcon.vue';
import { render } from 'vue';

const zoom: Ref<number> = ref(7);
const center: Ref<PointExpression | undefined> = ref([51.919438, 19.14513599999998]);
const locations: Ref<ILocation[]> = ref([]);
const rerenderMarkers: Ref<boolean> = ref(true);
const locationsStorage = useLocationsStore();

const zoomUpdated = (value: number) => {
  zoom.value = value;
}

onMounted(async () => {
  await locationsStorage.fetchLocations();
  locations.value = locationsStorage.activeLocations;

  watch(locationsStorage, async (newValue) => {
    if (!isArrayEqual(locations.value, newValue.activeLocations)) {
      rerenderMarkers.value = false;

      locations.value = locationsStorage.activeLocations;

      await nextTick();

      rerenderMarkers.value = true;
    }
  });

  watch(zoom, (newValue) => {
  });
});

</script>