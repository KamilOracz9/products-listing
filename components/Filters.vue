<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Filtry</template>
        <template v-slot:body>
            <div class="p-4 flex flex-col gap-4">
                <div class="flex gap-4 items-center">
                    <div>
                        Typ usługi:
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="USE">USE</label>
                        <input @change="changeType($event)" id="USE" class="-translate-y-[1px]" type="checkbox"
                            name="filter-type" value="USE">
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="ZSEU">ZESU</label>
                        <input @change="changeType($event)" id="ZSEU" class="-translate-y-[1px]" type="checkbox"
                            name="filter-type" value="ZSEU">
                    </div>
                </div>

                <div class="flex gap-4 items-center">
                    <div>
                        Pokaż dymki:
                    </div>
                    <div class="flex items-center gap-2">
                        <input @change="toggleDataShow($event)" class="-translate-y-[1px]" type="checkbox"
                            name="filter-show-data" value="1">
                    </div>
                </div>
            </div>
        </template>
    </MenuItemLayout>
</template>

<script setup lang="ts">
import MenuItemLayout from '~/layouts/MenuItemLayout.vue';
import type { ILocationType } from '~/types';

const filtersStore = useFiltersStore();
const open = ref(false);
const toggleOpen = () => open.value = !open.value;
const type: Ref<ILocationType | null> = ref(null);

const changeType = (event: Event) => {
    Array.from(document.querySelectorAll('input[name="filter-type"]'))
        .filter(checkbox => checkbox !== event.target)
        .forEach(filter => (<HTMLInputElement>filter).checked = false);

    if (!event.target) type.value = null;
    else type.value = (<HTMLInputElement>event.target).checked ? <ILocationType>(<HTMLInputElement>event.target).value : null;
}

const toggleDataShow = (event: Event) => {
    (<HTMLInputElement>event.target).checked ? filtersStore.showAllData() : filtersStore.closeAllData();
}

onMounted(() => {
    type.value = filtersStore.type;

    watch(type, () => {
        filtersStore.type = type.value;
        filtersStore.filter();
    })
});
</script>