<template>
    <section class="lg:col-span-2">
        <ul class="grid gap-4 max-h-[400px] lg:max-h-[700px] overflow-y-auto">
            <li class="bg-gray-2 px-6 py-5 rounded-br-[25px]" v-for="(location, index) in placeToBuyStore.locations.items" :key="index">
                <p class="font-medium text-lg xs:text-xl">{{ location.title }}</p>
                <p>{{ location.subtitle }}</p>
                <div class="mt-4 grid gap-4 text-sm xs:grid-cols-2 xs:gap-6 sm:text-base">
                    <div>
                        <p>{{ location.contact.address }}</p>
                        <p>{{ location.contact.phone }}</p>
                    </div>
                    <div class="grid justify-left gap-2 xs:justify-end">
                        <button class="w-fit flex gap-2 items-center"><img class="size-[16px]" src="@/assets/icons/map-pin.svg" alt=""> {{ $t('pages.place-to-buy.show-on-map') }}</button>
                        <NuxtLink class="flex gap-2 items-center"><img class="size-[16px]" src="@/assets/icons/map-pin.svg" alt=""> {{ $t('pages.place-to-buy.check-directions') }}</NuxtLink>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
const placeToBuyStore = usePlaceToBuyStore();

onMounted(async () => {
    await placeToBuyStore.fetchLocations();
})
</script>