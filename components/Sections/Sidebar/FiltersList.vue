<template>
    <ul class="flex flex-col gap-8">
        <li class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ $t('filters.collections') }}</span>
            <!-- <input :name="filter.name" v-if="filter.enableSearching" type="text" :placeholder="$t('search')" class="border rounded-[3px] p-1" /> -->
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="option in productsFilterStore.filters.collections" class="flex gap-3 items-center">
                    <input :checked="checkFilterUsed('collection', option.id)" name="collection"
                        :value="option.id" @change="onChange" type="checkbox"
                        class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                        :disabled="option.disabled" :id="`collection-${option.id}`" />
                    <label :class="option.disabled ? 'text-gray-4' : 'text-black'"
                        :for="`collection-${option.id}`">
                        {{ option.name }}
                    </label>
                </li>
            </ul>
        </li>
        <li v-for="filter in productsFilterStore.filters.attributes"
            class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ filter.name }}</span>
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="option in filter.options" class="flex gap-3 items-center">
                    <input :checked="checkFilterUsed(filter.name, option.value)" :name="filter.name"
                        :value="option.value" @change="onChange" type="checkbox"
                        class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                        :disabled="option.disabled" :id="`${filter.name}-${option.value}`" />
                    <label :class="option.disabled ? 'text-gray-4' : 'text-black'"
                        :for="`${filter.name}-${option.value}`">
                        {{ option.label }}
                    </label>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
const productsFilterStore = useProductsFilterStore();
const router = useRouter();
const route = useRoute();

const onChange = async (event) => {
    const query = route.query;
    const value = event.target.value;
    const checked = event.target.checked;

    const key = `${event.target.name}[]`;

    if (checked) {
        productsFilterStore.activeFilters[key].push(value);
    } else {
        productsFilterStore.activeFilters[key] = productsFilterStore.activeFilters[key].filter(activeFilter => activeFilter != value);
    }

    const params = { ...query, ...productsFilterStore.activeFilters };

    navigateTo({ query: params });
}

const checkFilterUsed = (filterName, optionValue) => {
    const query = router.currentRoute.value.query;

    return query[`${filterName}[]`] && !!Object.values(query[`${filterName}[]`]).filter(filter => filter == optionValue)[0];
}
</script>
