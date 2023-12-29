<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Filtry</template>
        <template v-slot:body>
            <div class="p-4 flex flex-col gap-4">
                <div>
                    <label for="filter-search">Szukaj po numerze</label>
                    <input type="text" v-model="searchNumber" id="filter-search"
                        class="w-full border border-[#000] mt-2 p-3">
                </div>
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
                        Przypisana trasa:
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="route">Tak</label>
                        <input @change="changeHasRoute($event)" id="route" class="-translate-y-[1px]" type="checkbox"
                            name="filter-has-route" :value="1">
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="no-route">Nie</label>
                        <input @change="changeHasRoute($event)" id="no-route" class="-translate-y-[1px]" type="checkbox"
                            name="filter-has-route" :value="0">
                    </div>
                </div>
            </div>
        </template>
    </MenuItemLayout>
</template>

<script setup lang="ts">
import MenuItemLayout from '~/layouts/MenuItemLayout.vue';
import type { ILocationType } from '~/types';
import debounce from 'lodash/debounce'

const filtersStore = useFiltersStore();

const open = ref(false);
const type: Ref<ILocationType | null> = ref(null);
const hasRoute: Ref<string | null> = ref(null);
const searchNumber = ref('');

const toggleOpen = () => open.value = !open.value;

const changeType = (event: Event) => {
    Array.from(document.querySelectorAll('input[name="filter-type"]'))
        .filter(checkbox => checkbox !== event.target)
        .forEach(filter => (<HTMLInputElement>filter).checked = false);

    if (!event.target) type.value = null;
    else type.value = (<HTMLInputElement>event.target).checked ? <ILocationType>(<HTMLInputElement>event.target).value : null;
}

const changeHasRoute = (event: Event) => {
    Array.from(document.querySelectorAll('input[name="filter-has-route"]'))
        .filter(checkbox => checkbox !== event.target)
        .forEach(filter => (<HTMLInputElement>filter).checked = false);

    if (!event.target) hasRoute.value = null;
    else hasRoute.value = (<HTMLInputElement>event.target).checked ? (<HTMLInputElement>event.target).value : null;
}

onMounted(() => {
    type.value = filtersStore.type;
    hasRoute.value = filtersStore.hasRoute;

    watch(searchNumber, debounce((value) => {
        filtersStore.number = value;
        filtersStore.filter();
    }, 500))

    watch(type, () => {
        filtersStore.type = type.value;
        filtersStore.filter();
    })

    watch(hasRoute, () => {
        filtersStore.hasRoute = hasRoute.value;
        filtersStore.filter();
    })
});
</script>