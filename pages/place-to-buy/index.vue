<template>
    <div>
        <p class="section-title">{{ $t('pages.place-to-buy.title') }}</p>

        <SectionsPlaceToBuySearch />

        <div class="grid gap-6 mb-10 lg:grid-cols-5 lg:gap-10">
            <div class="lg:col-span-2  text-2xl font-medium" v-if="!locationsList.length">
                {{ $t('pages.place-to-buy.locations-not-found') }}
            </div>
            <SectionsPlaceToBuyLocationsList :locationsList="locationsList" v-else />
            <MapsPlaceToBuyLocalizations :locationsList="data.locationsList" :key="mapKey" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PlaceToBuyPage } from '~/types/place-to-buy.types';
import { fetchShops } from '~/services/api';
import { DataKeys } from '~/enums/dataKeys';

const route = useRoute();

const mapKey = ref(0);
const mapZoom = ref(6);
const mapCenter = ref([52.121, 19.108]);
const selected = ref(null);
const page = ref(1);
const locationsIds = ref();
const locationsList: Ref = ref([]);

const { data }: { data: Ref<PlaceToBuyPage> } = await useAsyncData(DataKeys.PLACE_TO_BUY_SHOPS_LIST, async () => fetchShops(route.query, page.value, locationsIds.value), { watch: [() => route.query, page, locationsIds] });



onMounted(() => {
    watch(() => route.query, () => {
        page.value = 1;
        locationsList.value = [];
        selected.value = null;
    })

    watch(() => data.value, value => {
        locationsList.value = [...locationsList.value, ...value.locationsList];
    })

    locationsList.value = data.value.locationsList;
})

provide('mapZoom', mapZoom);
provide('mapCenter', mapCenter);
provide('mapKey', mapKey);
provide('selected', selected);
provide('page', page);
provide('locationsList', locationsList);
provide('locationsIds', locationsIds);
</script>