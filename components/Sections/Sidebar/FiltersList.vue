
<template>
    <ul class="flex flex-col gap-8">
        <li v-for="filter in productsFilterStore.filters" class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ filter.label }}</span>
            <input v-if="filter.enableSearching" type="text" :placeholder="$t('search')" class="border rounded-[3px] p-1" />
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="input in filter.inputs" class="flex gap-3 items-center">
                    <input type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0" :id="`${filter.key}-${input.value}`" />
                    <label class="" :for="`${filter.key}-${input.value}`">{{ input.label }}</label>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
const productsFilterStore = useProductsFilterStore();
</script>
