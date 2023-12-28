<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Wybrana lokalozacja</template>
        <template v-slot:body>
            <div class="p-4">
                {{ !locationStore.activeLocationId ? 'Brak wybranej lokalizacji' : locationStore.activeLocationId }}
            </div>
        </template>
    </MenuItemLayout>
</template>

<script setup lang="ts">
import MenuItemLayout from '~/layouts/MenuItemLayout.vue';

const locationStore = useLocationsStore();

const open = ref(false);

const toggleOpen = () => open.value = !open.value;

watch(locationStore, () => locationStore.activeLocationId ? open.value = true : open.value = false);
</script>