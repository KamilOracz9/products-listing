<template>
    <div>
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

        <p class="section-title">{{ title }}</p>

        <SectionsPlaceToBuySearch />
        <div class="grid gap-6 mb-10 lg:grid-cols-5 lg:gap-10">
            <template v-if="!pending">
                <div class="lg:col-span-2  text-2xl font-medium" v-if="!locationsList.length">
                    {{ $t('pages.place-to-buy.locations-not-found') }}
                </div>
                <SectionsPlaceToBuyLocationsList :locationsList="locationsList" v-else />
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

const mapKey = ref(0);
const mapZoom = ref(6);
const mapCenter = ref($getMapCenter());
const selected = ref(null);
const page = ref(1);
const lastPage = ref(false);
const locationsIds = ref();
const locationsList: Ref = ref([]);

const { data, pending }: { data: Ref<PlaceToBuyPage>, pending: Ref<boolean> } = await useAsyncData(DataKeys.PLACE_TO_BUY_SHOPS_LIST, async () => fetchShops(route.query, page.value, getLocaleIso(), locationsIds.value), { watch: [() => route.query, page, locationsIds] });

const { meta, breadcrumbs, title, schema } = toRefs(data.value);

onMounted(() => {
    watch(() => route.query, () => {
        page.value = 1;
        locationsList.value = [];
        selected.value = null;
        lastPage.value = false;
    })

    watch(locationsIds, () => {
        page.value = 1;
        locationsList.value = [];
        selected.value = null;
        lastPage.value = false;
    })

    watch(() => data.value, value => {
        locationsList.value = [...locationsList.value, ...value.locationsList];
        if (value.locationsList.length < 25) lastPage.value = true;
    })

    locationsList.value = data.value.locationsList;
})

provide('mapZoom', mapZoom);
provide('mapCenter', mapCenter);
provide('mapKey', mapKey);
provide('selected', selected);
provide('page', page);
provide('lastPage', lastPage);
provide('locationsList', locationsList);
provide('locationsIds', locationsIds);

setMeta(meta.value);

useSchemaOrg([
  schema.value
])
</script>