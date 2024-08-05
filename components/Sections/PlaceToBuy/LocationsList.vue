<template>
    <section class="lg:col-span-2">
        <ul class="grid gap-4 max-h-[400px] lg:max-h-[700px] overflow-y-auto pr-2" @scroll="onScroll">
            <li :class="selected === location.id ? 'border-black' : 'border-gray-2'"
                class="bg-gray-2 px-6 py-5 rounded-br-[25px] border" v-for="(location, index) in locationsList"
                :key="index">
                <p class="font-medium text-lg xs:text-xl">{{ location.title }}</p>
                <p>{{ location.subtitle }}</p>
                <div class="mt-4 grid gap-4 text-sm xs:grid-cols-2 xs:gap-6 sm:text-base">
                    <div>
                        <p>{{ location.contact.address }}</p>
                        <p>{{ location.contact.phone }}</p>
                    </div>
                    <div class="grid justify-left gap-2 xs:justify-end">
                        <button @click="() => onShowOnMap(location.coords, location.id)"
                            class="w-fit flex gap-2 items-center"><img class="size-[16px]"
                                src="@/assets/icons/map-pin.svg" alt=""
                                :aria-label="$t('pages.place-to-buy.show-on-map')"> {{
                                    $t('pages.place-to-buy.show-on-map') }}</button>
                        <button @click="onCheckTrace(location.coords)" class="flex gap-2 items-center"><img
                                class="size-[16px]" src="@/assets/icons/map-pin.svg" alt=""
                                :aria-label="$t('pages.place-to-buy.check-directions')"> {{
                                    $t('pages.place-to-buy.check-directions') }}</button>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import type { Location } from '~/types/place-to-buy.types';

const mapZoom: Ref<number> | undefined = inject('mapZoom');
const mapCenter: Ref<number[]> | undefined = inject('mapCenter');
const mapKey: Ref<number> | undefined = inject('mapKey');
const selected: Ref<number> | undefined = inject('selected');
const page: Ref<number> | undefined = inject('page') ?? ref(1);

const route = useRoute();

const props = defineProps<{
    locationsList: Location[];
}>();

const { locationsList } = toRefs(props);

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}


const onScroll = (e: Event) => {
    const element = e.currentTarget as HTMLElement;

    if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
        page.value = page.value + 1;
    }
}

const onShowOnMap = ({ lat, lng }: { lat: number; lng: number }, index: number) => {
    if (mapCenter) mapCenter.value = [lat, lng];
    if (mapZoom) mapZoom.value = 16;
    if (mapKey) mapKey.value += 1;
    if (selected !== undefined) selected.value = index;
}

const onCheckTrace = async ({ lat, lng }: { lat: number; lng: number }) => {
    navigator.geolocation.getCurrentPosition(response => {
        open(`https://www.google.pl/maps/dir/'${response.coords.latitude},${response.coords.longitude}'/'${lat},${lng}'/@${lat},${lng},16z`);
    }, error => {
        if (error.code === 1) open(`https://www.google.pl/maps/dir//'${lat},${lng}'/@${lat},${lng},16z`);
    })
}

onMounted(async () => {
    if (route.query.symbol) shuffle(locationsList.value)
})
</script>