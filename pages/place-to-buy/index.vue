<template>
    <div>
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

        <p class="section-title">{{ title }}</p>

        <SectionsPlaceToBuySearch />
        <div class="grid gap-6 mb-10 lg:grid-cols-5 lg:gap-10">
            <template v-if="!pending">
                <div class="lg:col-span-2  text-2xl font-medium" v-if="!locationsStore.state.displayedLocations.length">
                    {{ $t('pages.place-to-buy.locations-not-found') }}
                </div>
                <SectionsPlaceToBuyLocationsList 
                    :locationsList="locationsStore.state.displayedLocations" 
                    v-else />
            </template>
            <div v-else class="lg:col-span-2"></div>
            <ClientOnly>
                <MapsPlaceToBuyLocalizations :key="mapKey" />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PlaceToBuyPage } from '~/types/place-to-buy.types';
import { fetchShops } from '~/services/api';
import { DataKeys } from '~/enums/dataKeys';

const { $getMapCenter } = useNuxtApp();
const route = useRoute();

const locationsStore = usePlaceToBuyStore();

const mapKey = ref(0);
const mapZoom = ref(6);
const mapCenter = ref($getMapCenter());
const selected = ref(null);
const page = ref(1);
const lastPage = ref(false);
const locationsIds = ref([]);
const { $locale } = useNuxtApp();

const { data, pending }: { data: Ref<PlaceToBuyPage>, pending: Ref<boolean> } = await useAsyncData(DataKeys.PLACE_TO_BUY_SHOPS_LIST, async () => fetchShops(route.query, page.value, $locale, locationsIds.value), { watch: [() => route.query, page, locationsIds] });

const { meta, breadcrumbs, title, schema } = toRefs(data.value);

// Watch mapZoom and update store
watch(mapZoom, (newZoom) => {
    locationsStore.setMapZoom(newZoom);
});

// Watch for route changes and reset state
watch(() => route.query, () => {
    page.value = 1;
    selected.value = null;
    lastPage.value = false;
    locationsIds.value = [];
    locationsStore.reset();
    mapKey.value = mapKey.value + 1;
}, { deep: true });

// Watch for new data and handle pagination properly
watch(() => data.value, (newData) => {
    if (!newData) return;
    
    if (page.value === 1) {
        locationsStore.setAllLocations(newData.locationsList);
    } else {
        locationsStore.addLocations(newData.locationsList);
    }
    
    if (newData.locationsList.length < 25) {
        lastPage.value = true;
    }
}, { immediate: true });

// Initialize locations on mount
onMounted(() => {
    if (data.value?.locationsList) {
        locationsStore.setAllLocations(data.value.locationsList);
    }
});

provide('mapZoom', mapZoom);
provide('mapCenter', mapCenter);
provide('mapKey', mapKey);
provide('selected', selected);
provide('page', page);
provide('lastPage', lastPage);
provide('locationsIds', locationsIds);
provide('locationsStore', locationsStore);

setMeta(meta.value);

useSchemaOrg([
    schema.value
])
</script>