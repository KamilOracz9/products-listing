<template>
    <div v-if="!placeToBuyStore.isLoading">
        <SectionsCommonBreadrumbs :breadcrumbs="placeToBuyStore.breadcrumbs" />

        <p class="section-title">{{ $t('pages.place-to-buy.title') }}</p>

        <SectionsPlaceToBuySearch />

        <div class="grid gap-6 mb-10 lg:grid-cols-5 lg:gap-10">
            <SectionsPlaceToBuyLocationsList />
            <MapsPlaceToBuyLocalizations />
        </div>
    </div>
</template>

<script setup lang="ts">
const placeToBuyStore = usePlaceToBuyStore();

onMounted(async () => {
    placeToBuyStore.fetchData();
})
</script>