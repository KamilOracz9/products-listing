<template>
    <div>
        <div class="bg-gray-2 p-4 grid gap-4 items-center lg:grid-cols-6">
            <div class="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                <InputSelect2 :onkeydown="(event) => { if (event.keyCode === 13) onSubmit() }"
                    :disabled="!!city_or_code" modelKey="voievodeship" :options="voivodeships"
                    :placeholder="$t('pages.place-to-buy.select-voievodship')" />
                <InputSelect2 :onkeydown="(event) => { if (event.keyCode === 13) onSubmit() }"
                    :disabled="!!city_or_code" modelKey="city" :options="cities"
                    :placeholder="$t('pages.place-to-buy.select-city')" />
            </div>

            <div class="text-lg text-center">{{ $t('or') }}</div>

            <input :disabled="!!voievodeship || !!city" v-model="city_or_code" type="text"
                :onkeydown="(event) => { if (event.keyCode === 13) onSubmit() }"
                class="disabled:bg-gray-6 border-gray-6 focus:border-gray-6 lg:col-span-2 w-full py-3.5 px-5 focus:ring-0 placeholder:text-gray-1 placeholder:text-sm"
                :placeholder="$t('pages.place-to-buy.input-placeholder')">
            <div class="[&>button]:border-black [&>button]:justify-center [&>button]:h-[52px]">
                <ButtonsTransparent :onClick="onSubmit" tagType="button" :label="$t('search')" />
            </div>
        </div>

        <div class="w-full flex justify-end items-center my-6 text-sm lg:my-10">
            <button @click="onGetGeolocation" type="button" class="flex gap-2 items-center"
                :aria-label="$t('pages.place-to-buy.search-by-my-localization')"><img class="size-[22px]"
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
const { $getMapCenter } = useNuxtApp();
const { locale, locales } = useI18n();

const mapZoom: Ref<number> | undefined = inject('mapZoom');
const mapCenter: Ref<number[]> | undefined = inject('mapCenter');
const mapKey: Ref<number> | undefined = inject('mapKey');

const voievodeship: Ref<string | null> = ref(null);
const city: Ref<string | null> = ref(null);
const city_or_code: Ref<string | null> = ref(null);
const symbol: Ref<string | null> = ref(null);

const cities = ref([]);
const voivodeships = ref([]);

// const { data: voivodeships } = await useAsyncData(DataKeys.VOIVODESHIPS_LIST, async () => fetchVoivodeships(voievodeship.value as string, getLocaleIso()), { watch: [voievodeship] });
// const { data: cities } = await useAsyncData(DataKeys.CITIES_LIST, async () => fetchCities(city.value as string, getLocaleIso()), { watch: [city.value] });

provide('voievodeship', voievodeship);
provide('city', city);

const onGetGeolocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${latitude},${longitude}&polygon_geojson=1&format=json`)
            .then(response => response.json())
            .then(data => {
                const matches = {
                    County: "",
                    " ": ""
                };

                voievodeship.value = null;
                city.value = null;
                city_or_code.value = data[0].display_name.split(',').reverse()[3].replace(/ |County/gi, function (matched: { County: string; " ": string; }) {
                    return matches[matched];
                });
                onSubmit();
            })
    })
}

const onSubmit = async () => {
    const query = { ...router.currentRoute.value.query }

    if (voievodeship.value && !city_or_code.value) query.voievodeship = voievodeship.value;
    else delete query.voievodeship;

    if (city.value && !city_or_code.value) query.city = city.value;
    else delete query.city;

    if (city_or_code.value && (!voievodeship.value || !city.value)) query.city_or_code = city_or_code.value;
    else delete query.city_or_code;

    if (symbol.value) query.symbol = symbol.value;
    else delete query.symbol;

    router.push({ query });

    if (mapCenter) mapCenter.value = $getMapCenter();
    if (mapZoom) mapZoom.value = 6;
    if (mapKey) mapKey.value += 1;
}

onMounted(() => {
    voievodeship.value = <string>route.query.voievodeship ?? null;
    city.value = <string>route.query.city ?? null;
    city_or_code.value = <string>route.query.city_or_code ?? null;
    symbol.value = <string>route.query.symbol ?? null;

    watch(city, (value) => {
        fetchCities(value as string, locales.value.find(item => item.code === locale.value).language).then(response => cities.value = response)
    })

    watch(voievodeship, (value) => {
        fetchVoivodeships(value as string, locales.value.find(item => item.code === locale.value).language).then(response => voivodeships.value = response)
    })
})
</script>