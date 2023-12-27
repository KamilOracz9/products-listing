<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Legenda</template>
        <template v-slot:body>
            <div class="flex flex-wrap gap-10 p-4">
                <div class="flex flex-col gap-2">
                    <div v-for="icon in icons" class="flex w-[70px] justify-between">
                        <div class="items-center flex" v-text="icon.title"></div>
                        <div v-html="icon.icon"></div>
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-[230px]">
                    <div v-for="color in colors" class="flex justify-between items-center">
                        <div v-text="color.title"></div>
                        <div :style="`background-color: ${color.color};`"
                            :class="`h-[25px] w-[50px] flex border border-[#000]`"></div>
                    </div>
                </div>
            </div>
        </template>
    </MenuItemLayout>
</template>

<script setup lang="ts">
import MenuItemLayout from '~/layouts/MenuItemLayout.vue';
import { icon } from '~/libs/osm/services';

const { public: { expiredStatusesColors } } = useRuntimeConfig();
const open = ref(false);
const toggleOpen = () => open.value = !open.value;

const icons = ref([
    {
        'title': 'USE',
        'icon': icon({
            expiredStatusId: null,
            locationType: "USE",
            markerSize: 25,
        }),
    },
    {
        'title': 'ZSEU',
        'icon': icon({
            expiredStatusId: null,
            locationType: "ZSEU",
            markerSize: 25,
        }),
    }
]);

const colors = ref([
    {
        'title': 'Jeszcze czas',
        'color': expiredStatusesColors.green,
    },
    {
        'title': 'Przypisz natychmiast',
        'color': expiredStatusesColors.yellow,
    },
    {
        'title': 'Przeterminowane',
        'color': expiredStatusesColors.red,
    },
]);
</script>