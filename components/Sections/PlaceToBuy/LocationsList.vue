<template>
    <section class="lg:col-span-2">
        <ul ref="listRef" class="grid gap-4 max-h-[400px] lg:max-h-[700px] overflow-y-auto pr-2" @scroll="onScroll">
            <li :id="`locations-list-${(location.id).toString()}`"
                :class="selected == location.id ? 'border-black' : 'border-gray-2'"
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
                            class="w-fit flex gap-2 items-center"><img class="size-[16px]" src="@/assets/icons/map-pin.svg"
                                alt="" :aria-label="$t('pages.place-to-buy.show-on-map')"> {{
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
const selected = <Ref<number>>inject('selected');
const page: Ref<number> | undefined = inject('page') ?? ref(1);
const lastPage = <Ref<boolean>>inject('lastPage');
const listRef = ref(null);

const props = defineProps<{
    locationsList: Location[];
}>();

const { locationsList } = toRefs(props);

const onScroll = (e: Event) => {
    const element = e.currentTarget as HTMLElement;

    if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
        if (!lastPage.value) page.value = page.value + 1;
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

watch(selected, value => {
    const element = document.getElementById(`locations-list-${value}`);
    
    if(element) scrollToElm(listRef.value, element);
})

function scrollToElm(container, elm) {
    var pos = getRelativePos(elm);
    scrollTo(container, pos.top);  // duration in seconds
}

function getRelativePos(elm) {
    var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
        cPos = elm.getBoundingClientRect(), // target pos
        pos = {};

    pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop,
        pos.right = cPos.right - pPos.right,
        pos.bottom = cPos.bottom - pPos.bottom,
        pos.left = cPos.left - pPos.left;

    return pos;
}

function scrollTo(element, to) {
    var start = element.scrollTop,
        change = to - start,
        startTime = performance.now(),
        val, now, elapsed, t;

    function animateScroll() {
        now = performance.now();
        elapsed = (now - startTime) / 500;
        t = (elapsed / 1);

        element.scrollTop = start + change * easeInOutQuad(t);

        if (t < 1) window.requestAnimationFrame(animateScroll);
    };

    animateScroll();
}

function easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t };
</script>