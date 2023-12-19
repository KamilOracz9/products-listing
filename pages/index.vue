<template>
  <MainLayout>
    <LMap ref="map" :zoom="zoom" :center="center">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
      <MapMarker v-for="location in locations" :location="location"></MapMarker>
    </LMap>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import MapMarker from '~/components/MapMarker.vue';
import type { PointExpression } from 'leaflet';

const zoom: Ref<number> = ref(7);
const center: Ref<PointExpression | undefined> = ref([51.919438, 19.14513599999998]);
const locations: Ref<(void | number[] | undefined)[]> = ref([]);

const locationsStorage = useLocationsStore();

onMounted(async () => {
  await locationsStorage.fetchLocations();
  locations.value = locationsStorage.locations.filter(location => location.address.delivery_latitude);
});

</script>