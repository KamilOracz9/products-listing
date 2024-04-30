<template>
    <div>
        <div class="bg-gray-2 p-4 grid gap-4 items-center lg:grid-cols-6">
            <div class="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                <InputSelect2 :disabled="!!city_or_code" modelKey="voivodeship_name" :options="voivodeships"
                    :placeholder="$t('pages.place-to-buy.select-voievodship')" />
                <InputSelect2 :disabled="!!city_or_code" modelKey="city" :options="cities"
                    :placeholder="$t('pages.place-to-buy.select-city')" />
            </div>

            <div class="text-lg text-center">{{ $t('or') }}</div>

            <input :disabled="!!voivodeship_name || !!city" v-model="city_or_code" type="text"
                class="disabled:bg-gray-6 border-gray-6 focus:border-gray-6 lg:col-span-2 w-full py-3.5 px-5 focus:ring-0 placeholder:text-gray-1 placeholder:text-sm"
                :placeholder="$t('pages.place-to-buy.input-placeholder')">
            <div class="[&>button]:border-black [&>button]:justify-center [&>button]:h-[52px]">
                <ButtonsTransparent :onClick="onSubmit" tagType="button" :label="$t('search')" />
            </div>
        </div>

        <div class="bg-gray-2 p-4 grid gap-4 items-center lg:grid-cols-6">
            <input v-model="symbol" type="text"
                class="disabled:bg-gray-6 border-gray-6 focus:border-gray-6 lg:col-span-2 w-full py-3.5 px-5 focus:ring-0 placeholder:text-gray-1 placeholder:text-sm"
                :placeholder="$t('pages.place-to-buy.symbol')">
        </div>

        <div class="w-full flex justify-end items-center my-6 text-sm lg:my-10">
            <button @click="onGetGeolocation" type="button" class="flex gap-2 items-center" :aria-label="$t('pages.place-to-buy.search-by-my-localization')"><img class="size-[22px]"
                    src="@/assets/icons/map-pin.svg" alt="">
                {{ $t('pages.place-to-buy.search-by-my-localization') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchCities, fetchVoivodeships } from '~/services/api';

const route = useRoute();
const router = useRouter();

const mapZoom: Ref<number> | undefined = inject('mapZoom');
const mapCenter: Ref<number[]> | undefined = inject('mapCenter');
const mapKey: Ref<number> | undefined = inject('mapKey');

const voivodeship_name: Ref<string | null> = ref(null);
const city: Ref<string | null> = ref(null);
const city_or_code: Ref<string | null> = ref(null);
const symbol: Ref<string | null> = ref(null);

const { data: voivodeships } = await useAsyncData(DataKeys.VOIVODESHIPS_LIST, () => fetchVoivodeships(voivodeship_name.value as string), { watch: [voivodeship_name] });
const { data: cities } = await useAsyncData(DataKeys.CITIES_LIST, () => fetchCities(city.value as string), { watch: [city] });

provide('voivodeship_name', voivodeship_name);
provide('city', city);

const onGetGeolocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${latitude},${longitude}&polygon_geojson=1&format=json`)
            .then(response => response.json())
            .then(data => {
                voivodeship_name.value = null;
                city.value = null;
                city_or_code.value = data[0].display_name.split(',').reverse()[3].replace(' ', '');
                onSubmit();
            })
    })
}

const onSubmit = async () => {
    const query = { ...router.currentRoute.value.query }

    if (voivodeship_name.value && !city_or_code.value) query.voivodeship_name = voivodeship_name.value;
    else delete query.voivodeship_name;

    if (city.value && !city_or_code.value) query.city = city.value;
    else delete query.city;

    if (city_or_code.value && (!voivodeship_name.value || !city.value)) query.city_or_code = city_or_code.value;
    else delete query.city_or_code;

    if (symbol.value) query.symbol = symbol.value;
    else delete query.symbol;

    router.push({ query });

    if (mapCenter) mapCenter.value = [52.121, 19.108];
    if (mapZoom) mapZoom.value = 6;
    if (mapKey) mapKey.value += 1;
}

onMounted(async () => {
    voivodeship_name.value = <string>route.query.voivodeship_name ?? null;
    city.value = <string>route.query.city ?? null;
    city_or_code.value = <string>route.query.city_or_code ?? null;
    symbol.value = <string>route.query.symbol ?? null;
})
</script>