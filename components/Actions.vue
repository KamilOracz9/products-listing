<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Akcje</template>
        <template v-slot:body>
            <div class="flex flex-col p-4">
                <button class="bg-[#5f5fff] text-white h-10 rounded-md" type="button" @click="handleRefresh">Odśwież dane</button>
            </div>
        </template>
    </MenuItemLayout>
</template>

<script setup lang="ts">
import MenuItemLayout from '~/layouts/MenuItemLayout.vue';

const locationsStorage = useLocationsStore();
const filtersStore = useFiltersStore();

const open = ref(false);
const toggleOpen = () => open.value = !open.value;

const handleRefresh = async () => {
    locationsStorage.fetchLocations().then(() => filtersStore.filter());
}
</script>