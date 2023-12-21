<template>
    <div class="border-b-2">
        <div class="font-bold p-4 cursor-pointer" @click="open = !open">
            Wybrana lokalozacja
        </div>
        <div class="text-xs" :class="open ? 'border-t' : 'hidden'">
            <div class="p-4">
                {{ !locationStore.activeLocationId ? 'Brak wybranej lokalizacji' : locationStore.activeLocationId }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const open: Ref<boolean> = ref(false);
const locationStore = useLocationsStore();

watch(locationStore, () => locationStore.activeLocationId ? open.value = true : open.value = false);
</script>