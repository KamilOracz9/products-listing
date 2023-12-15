<template>
  <div style="height:100vh; width:100vw">
    <div>{{ coords }}</div>
    <LMap ref="map" :zoom="zoom" :center="[51.395918283664265, 21.152872568862815]">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base" name="OpenStreetMap" />
        <l-marker :lat-lng="coords"></l-marker>
    </LMap>
  </div>
</template>

<script setup>
const zoom = ref(8)
const coords = ref([0, 0]);

// const postalCodes = ['26-600', '27-600', '28-600', '29-600'];

const postalCode = '26-600';

const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${postalCode}`;

const fetchCoords = async () => {
  return await fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const location = data[0];

        return [parseFloat(location.lat), parseFloat(location.lon)];
      } else {
        console.error('Brak danych dla podanego kodu pocztowego.');
      }
    })
    .catch(error => {
      console.error('Błąd podczas wykonania zapytania HTTP:', error);
    });
}

onMounted(() => {
  fetchCoords().then(response => {coords.value = response}).then(() => console.log(coords));
});

</script>

<style>
body {
  margin: 0;
}
</style>