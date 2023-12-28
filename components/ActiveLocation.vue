<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Wybrana lokalozacja</template>
        <template v-slot:body>
            <div class="p-4 flex flex-col gap-2">
                <template v-if="!locationStore.activeLocationId || !locationStore.activeLocation">
                    Brak wybranej lokalizacji
                </template>
                <template v-else>
                    <p class="font-bold">Dane adresowe:</p>
                    <p>Numer: {{ locationStore.activeLocation.name }}</p>
                    <p>Ulica: {{ locationStore.activeLocation.address.delivery_street }}</p>
                    <p>Miasto: {{ locationStore.activeLocation.address.delivery_city }}</p>
                    <p>Telefon: {{ locationStore.activeLocation.address.delivery_phone }}</p>
                    <p>Email: {{ locationStore.activeLocation.address.delivery_email }}</p>
                    <p>Data instalacji: {{ locationStore.activeLocation.installation_date }}</p>
                    <p class="font-bold">Usługi:</p>
                    <div class="flex">
                        <div v-for="service in locationStore.activeLocation.services">
                            <p>Kod: {{ service.code }}</p>
                            <p>Nazwa: {{ service.name }}</p>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </MenuItemLayout>
</template>

<script setup lang="js">
import MenuItemLayout from '~/layouts/MenuItemLayout.vue';

const locationStore = useLocationsStore();

const open = ref(false);
const toggleOpen = () => open.value = !open.value;

watch(locationStore, () => {
    locationStore.activeLocation ? open.value = true : open.value = false;

    console.log(locationStore.activeLocation);
})
</script>