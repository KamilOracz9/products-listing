
<template>
    <div>
        <div class="bg-gray-2 p-4 grid gap-4 items-center lg:grid-cols-6">
            <div class="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                <InputSelect2 :disabled="!!name" modelKey="voievodship" :options="placeToBuyStore.voievodships"
                    :placeholder="$t('pages.place-to-buy.select-voievodship')" />
                <InputSelect2 :disabled="!!name" modelKey="city" :options="placeToBuyStore.cities"
                    :placeholder="$t('pages.place-to-buy.select-city')" />
            </div>

            <div class="text-lg text-center">{{ $t('or') }}</div>

            <input :disabled="!!voievodship || !!city" v-model="name" type="text"
                class="disabled:bg-gray-6 border-gray-6 focus:border-gray-6 lg:col-span-2 w-full py-3.5 px-5 focus:ring-0 placeholder:text-gray-1 placeholder:text-sm"
                :placeholder="$t('pages.place-to-buy.input-placeholder')">
            <div class="[&>button]:border-black [&>button]:justify-center [&>button]:h-[52px]">
                <ButtonsTransparent :onClick="onSubmit" tagType="button" :label="$t('search')" />
            </div>
        </div>

        <div class="w-full flex justify-end items-center my-6 text-sm lg:my-10">
            <button @click="onGetGeolocation" type="button" class="flex gap-2 items-center"><img class="size-[22px]"
                    src="@/assets/icons/map-pin.svg" alt=""> {{ $t('pages.place-to-buy.search-by-my-localization')
                    }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const placeToBuyStore = usePlaceToBuyStore();


const voievodship: Ref<string | null> = ref(null);
const city: Ref<string | null> = ref(null);
const name: Ref<string | null> = ref(null);

provide('voievodship', voievodship);
provide('city', city);

const onGetGeolocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
        voievodship.value = null;
        city.value = null;
        name.value = null;
        // console.log(response)

        onSubmit();
    })
}

const onSubmit = () => {
    const query = { ...router.currentRoute.value.query }

    if (voievodship.value && !name.value) query.voievodship = voievodship.value;
    else delete query.voievodship;

    if (city.value && !name.value) query.city = city.value;
    else delete query.city;

    if (name.value && (!voievodship.value || !city.value)) query.name = name.value;
    else delete query.name;

    router.push({ query });
}

onMounted(async () => {
    voievodship.value = <string>route.query.voievodship ?? null;
    city.value = <string>route.query.city ?? null;
    name.value = <string>route.query.name ?? null;

    if (voievodship.value) await placeToBuyStore.fetchVoievodships();
    if (city.value) await placeToBuyStore.fetchCities();

    watch(voievodship, value => {
        placeToBuyStore.fetchVoievodships();
    })

    watch(city, value => {
        placeToBuyStore.fetchCities();
    })
})
</script>