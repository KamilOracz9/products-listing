<template>
    <SectionsProductsAccordion :label="$t('product.product-table')" id="product-table">
        <div>
            <ul class="flex gap-2 overflow-x-auto pb-3 mb-10">
                <li v-for="techImage in productStore.product.item.images.tech" class="min-w-[128px] lg:w-[300px]">
                    <picture>
                        <source media="(min-width: 1024px)" :srcset="techImage.desktop">
                        <img class="w-full" :src="techImage.mobile" alt="">
                    </picture>
                </li>
            </ul>
        </div>

        <div class="overflow-x-auto pb-3">
            <table>
                <thead>
                    <th class="text-lg font-medium px-8 pb-4 border-b-[2px] border-gray-1" v-for="header in headers">{{ $t(`product.${header}`) }}</th>
                </thead>
                <tbody>
                    <tr v-for="variant in productStore.product.item.variants" class="text-sm even:bg-gray-2">
                        <td class="pl-8 py-1">{{ variant.symbol }}</td>
                        <td class="pl-8 py-1">{{ variant.dimensions }}</td>
                        <td class="text-center">{{ variant.doors.number }}{{ variant.doors.direction }}</td>
                        <td class="text-center">{{ variant.a }}</td>
                        <td class="text-center">{{ variant.b }}</td>
                        <td class="text-center">{{ variant.c }}</td>
                        <td class="text-center">{{ variant.h }}</td>
                        <td class="text-center">{{ variant.w }}</td>
                        <td class="text-center">{{ variant.x1 }}</td>
                        <td class="text-center">{{ variant.x2 }}</td>
                        <td class="w-fit whitespace-nowrap pl-5 font-medium bg-white">
                            <button>{{ $t('product.add-to-clipboard') }}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </SectionsProductsAccordion>
</template>

<script setup>
const productStore = inject('productStore');
const headers = ['symbol', 'dimensions', 'doors', 'a', 'b', 'c', 'h', 'w', 'x1', 'x2'];
</script>