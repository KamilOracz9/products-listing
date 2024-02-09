<template>
    <div v-if="!placeToBuyStore.isLoading">
        <SectionsCommonBreadrumbs :breadcrumbs="placeToBuyStore.breadcrumbs" />

        <p class="section-title">{{ $t('pages.place-to-buy.title') }}</p>

        <SectionsPlaceToBuySearch />
    </div>
</template>

<script setup lang="ts">
const placeToBuyStore = usePlaceToBuyStore();

onMounted(async () => {
    placeToBuyStore.fetchData();
})
</script>