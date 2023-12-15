<template>
  <div style="height:100vh; width:100vw">
    <div>{{ coords }}</div>
    <LMap ref="map" :zoom="zoom" :center="[51.395918283664265, 21.152872568862815]">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
      <l-marker v-for="coord in coords" :lat-lng="coord"></l-marker>
    </LMap>
  </div>
</template>

<script setup>
const zoom = ref(8)
const coords = ref([]);

const postalCodes = ['26-600', '27-600', '28-600', '29-600'];

const fetchCoords = async (apiUrl) => {
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
  postalCodes.forEach(postalCode => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${postalCode}`

    fetchCoords(apiUrl).then(response => { if(response) coords.value.push(response) }).then(() => console.log(coords.value));
  });
});

</script>

<style>
body {
  margin: 0;
}
</style>