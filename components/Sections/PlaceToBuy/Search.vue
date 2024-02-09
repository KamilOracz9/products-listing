
<template>
    <div class="bg-gray-2 p-4 grid gap-4 items-center lg:grid-cols-6">
        <div class="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            <InputSelect2 selectKey="voievodship" searchKey="searchVoievodship" :options="placeToBuyStore.voievodships"
                :placeholder="$t('pages.place-to-buy.select-voievodship')" />
            <InputSelect2 selectKey="city" searchKey="searchCity" :options="placeToBuyStore.cities"
                :placeholder="$t('pages.place-to-buy.select-city')" />
        </div>

        <div class="text-lg text-center">{{ $t('or') }}</div>

        <input type="text" class="disabled:bg-gray-6 px-5 py-3.5 placeholder:text-gray-1 border-gray-6 lg:col-span-2"
            :placeholder="$t('pages.place-to-buy.input-placeholder')">
        <div class="[&>button]:border-black [&>button]:justify-center [&>button]:h-[52px]">
            <ButtonsTransparent :onClick="onSubmit" tagType="button" :label="$t('search')" />
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const placeToBuyStore = usePlaceToBuyStore();

const searchVoievodship: Ref<string> = ref('');
const searchCity: Ref<string> = ref('');

provide('searchVoievodship', searchVoievodship);
provide('searchCity', searchCity);

const voievodship: Ref<string | null> = ref(null);
const city: Ref<string | null> = ref(null);
const name: Ref<string | null> = ref(null);

const onSelect = (option: { label: string; value: string }, selectKey: string) => {
    switch (selectKey) {
        case 'voievodship': setVoievodship(option); break;
        case 'city': setCity(option); break;
    }
};

provide('onSelect', onSelect);

const setVoievodship = ({ label, value }: { label: string; value: string }) => {
    // const query = { ...router.currentRoute.value.query, voievodship: value }

    // router.push({ query });

    searchVoievodship.value = label;
}

const setCity = ({ label, value }: { label: string; value: string }) => {
    // const query = { ...router.currentRoute.value.query, city: value }

    // router.push({ query });

    searchCity.value = label;
}

const onSubmit = () => {
    const query = { ...router.currentRoute.value.query }
    
    if(searchVoievodship.value) query.voievodship = searchVoievodship.value;
    else delete query.voievodship;

    console.log(searchVoievodship.value)

    if(searchCity.value) query.city = searchCity.value;
    else delete query.city;

    router.push({ query });
}

onMounted(async () => {
    voievodship.value = <string>route.query.voievodship ?? null;
    city.value = <string>route.query.city ?? null;
    name.value = <string>route.query.name ?? null;

    if (voievodship.value) {
        await placeToBuyStore.fetchVoievodships();
        searchVoievodship.value = voievodship.value;
        // searchVoievodship.value = placeToBuyStore.voievodships.items.filter(item => item.value === voievodship.value)[0].label;
    }

    if (city.value) {
        await placeToBuyStore.fetchCities();
        searchCity.value = city.value;
        // searchCity.value = placeToBuyStore.cities.items.filter(item => item.value === city.value)[0].label;
    }

    watch(searchVoievodship, value => {
        placeToBuyStore.fetchVoievodships();
    })

    watch(searchCity, value => {
        placeToBuyStore.fetchCities();
    })
})
</script>