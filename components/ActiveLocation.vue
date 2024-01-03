<template>
    <MenuItemLayout :open="open">
        <template v-slot:title>Wybrana lokalozacja</template>
        <template v-slot:body>
            <div class="p-4 flex flex-col gap-2">
                <template v-if="!locationStore.activeLocationId || !locationStore.activeLocation">
                    Brak wybranej lokalizacji
                </template>
                <template v-else>
                    <p class="font-bold">Dane adresowe:</p>
                    <p>Nazwa: {{ locationStore.activeLocation.address.delivery_name }}</p>
                    <p>Numer: {{ locationStore.activeLocation.name }}</p>
                    <p>Typ: {{ locationStore.activeLocation.type }}</p>
                    <p>Ulica: {{ locationStore.activeLocation.address.delivery_street }}</p>
                    <p>Miasto: {{ locationStore.activeLocation.address.delivery_city }}</p>
                    <p>Telefon: {{ locationStore.activeLocation.address.delivery_phone }}</p>
                    <p>Email: {{ locationStore.activeLocation.address.delivery_email }}</p>
                    <p>Data instalacji: {{ locationStore.activeLocation.installation_date }}</p>
                    <p>Trasa: {{ locationStore.activeLocation.route_name }}</p>
                    <p class="font-bold" v-if="locationStore.activeLocation.zse_id">Usługi:</p>
                    <div class="flex flex-col gap-2">
                        <div v-for="service in locationStore.activeLocation.services">
                            <p>Kod: {{ service.code }}</p>
                            <p>Nazwa: {{ service.name }}</p>
                            <p>Ilość: {{ parseFloat(service.count).toFixed(0) }}</p>
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

const open = ref(true);
</script>