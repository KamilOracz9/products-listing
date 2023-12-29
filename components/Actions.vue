<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Akcje</template>
        <template v-slot:body>
            <div class="flex flex-col p-4 gap-4">
                <button class="bg-[#5f5fff] text-white h-10" type="button" @click="handleRefresh">Odśwież dane</button>
                <button class="bg-[#bf5fff] text-white h-10" type="button" @click="handleToggleGlobalStore">Przełącz grupowanie</button>
                <button class="bg-[#f3b94d] text-white h-10" type="button" @click="toggleDataShow">Przełącz szczegóły</button>
            </div>
        </template>
    </MenuItemLayout>
</template>

<script setup lang="ts">
import MenuItemLayout from '~/layouts/MenuItemLayout.vue';

const locationsStorage = useLocationsStore();
const filtersStore = useFiltersStore();
const globalStore = useGlobalStore();

const open = ref(false);
const toggleOpen = () => open.value = !open.value;

const handleRefresh = async () => locationsStorage.fetchLocations().then(() => filtersStore.filter());
const handleToggleGlobalStore = () => globalStore.groupedMode = !globalStore.groupedMode;
const toggleDataShow = () => globalStore.dataOpen ? globalStore.closeAllData() : globalStore.showAllData();
</script>