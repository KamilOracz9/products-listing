<template>
    <ul class="flex flex-col gap-8">
        <li class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ $t('filters.collections') }}</span>
            <!-- <input :name="filter.name" v-if="filter.enableSearching" type="text" :placeholder="$t('search')" class="border rounded-[3px] p-1" /> -->
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="option in filters.collections" class="flex gap-3 items-center">
                    <input :checked="checkFilterUsed('collection', option.id)" name="collection" :value="option.id"
                        @change="onChange" type="checkbox"
                        class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                        :disabled="option.disabled" :id="`collection-${option.id}`" />
                    <label :class="option.disabled ? 'text-gray-4' : 'text-black'" :for="`collection-${option.id}`">
                        {{ option.name }}
                    </label>
                </li>
            </ul>
        </li>
        <li v-for="filter in filters.attributes" class="flex flex-col gap-4 border-b border-gray-1 pb-4">
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
const props = defineProps(['filters']);
const route = useRoute();
const { filters } = toRefs(props);

const onChange = (event) => {
    const { name, value, checked } = event.target;
    const key = `${name}[]`;

    const query = { ...route.query };

    if (checked) {
        query[key] = Array.isArray(query[key]) ? [...query[key], value] : [value];
    } else {
        if (Array.isArray(query[key])) {
            query[key] = query[key].filter((item) => item !== value);
            if (query[key].length === 0) {
                delete query[key];
            }
        }
    }

    navigateTo({ query });
}

const checkFilterUsed = (filterName, optionValue) => {
    const query = route.query;

    return query[`${filterName}[]`] && !!Object.values(query[`${filterName}[]`]).filter(filter => filter == optionValue)[0];
}
</script>
