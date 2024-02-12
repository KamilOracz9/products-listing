<template>
    <div v-if="!placeToBuyStore.isLoading">
        <SectionsCommonBreadrumbs :breadcrumbs="placeToBuyStore.breadcrumbs" />

        <p class="section-title">{{ $t('pages.place-to-buy.title') }}</p>

        <SectionsPlaceToBuySearch />

        <div class="grid gap-6 mb-10 lg:grid-cols-5 lg:gap-10">
            <SectionsPlaceToBuyLocationsList />
            <MapsPlaceToBuyLocalizations :key="mapKey" />
        </div>
    </div>
</template>

<script setup lang="ts">
const placeToBuyStore = usePlaceToBuyStore();

const mapKey = ref(0);
const mapZoom = ref(6);
const mapCenter = ref([52.121, 19.108]);
const selected = ref(null);

provide('mapZoom', mapZoom);
provide('mapCenter', mapCenter);
provide('mapKey', mapKey);
provide('selected', selected);

onMounted(async () => {
    await placeToBuyStore.fetchData();
})
</script>