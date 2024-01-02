<template>
    <MenuItemLayout :open="open" :toggleOpen="toggleOpen">
        <template v-slot:title>Legenda</template>
        <template v-slot:body>
            <div class="flex flex-wrap gap-4 p-4">
                <div class="flex flex-col gap-2 w-[70px]">
                    <div class="flex w-full justify-between">
                        <div class="items-center flex">USE</div>
                        <img :class="`legend-loaction-icon h-[30px]`" :src="`/assets/icons/use_red.svg`" alt="">
                    </div>

                    <div class="flex w-full justify-between">
                        <div class="items-center flex">ZSEU</div>
                        <img :class="`legend-loaction-icon h-[30px]`" :src="`/assets/icons/zseu_red.svg`" alt="">
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
import type { IExpiredStatusId, IIcon } from '~/types';

const { public: { expiredStatusesColors } } = useRuntimeConfig();

const open = ref(false);

const toggleOpen = () => open.value = !open.value;

// const icons = ref([
//     {
//         'title': 'USE',
//         'icon': icon({
//             expiredStatusId: null,
//             locationType: "USE",
//             markerSize: 25,
//         }),
//     },
//     {
//         'title': 'ZSEU',
//         'icon': icon({
//             expiredStatusId: null,
//             locationType: "ZSEU",
//             markerSize: 25,
//         }),
//     }
// ]);

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

function color(expiredStatusId: IExpiredStatusId) {
    switch (expiredStatusId) {
        case 0: return 'green';
        case 1: return 'yellow';
        case 2: return 'red';
        default: return 'black';
    }
}

// function icon({ expiredStatusId, locationType, markerSize }: IIcon) {
//     switch (locationType) {
//         case 'USE': return `
//             <svg class="loaction-icon" width="${markerSize}" height="${markerSize}">
//                 <rect width="300" height="100" stroke="black" stroke-width=".5" fill="${expiredStatusesColors[color(expiredStatusId)]}"/>
//             </svg>
//         `;
//         case 'ZSEU': return `
//             <svg class="loaction-icon" height="${markerSize}" width="${markerSize}">
//                 <circle cx="${markerSize / 2}" cy="${markerSize / 2}" r="${markerSize / 2}" stroke="black" stroke-width=".5" fill="${expiredStatusesColors[color(expiredStatusId)]}" />
//             </svg>
//         `;
//         default: return '';
//     }
// }
</script>