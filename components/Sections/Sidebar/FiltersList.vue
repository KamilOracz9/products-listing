<template>
    <ul class="flex flex-col gap-8">
        <li v-for="filter in attributes" class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ $t(`filters.${filter.name}`) }}</span>
            <input v-model="collectionsSearch" v-if="filter.name === 'collections'" type="text"
                :placeholder="$t('search')" class="border rounded-[3px] p-1" />
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="option in filter.options" class="flex gap-3 items-center">
                    <input :checked="checkFilterUsed(filter.name, option.value)" :name="filter.name"
                        :value="option.value" @change="onChange" type="checkbox"
                        class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                        :id="`${filter.name}-${option.value}`" />
                    <label :class="option.disabled ? 'text-black' : 'text-black'"
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
const refresh = inject('refresh');
const collectionsSearch = ref('');

const attributes = computed(() => Object.keys(filters.value).map(key => {
    if (key !== 'dimensions') return filters.value[key]
}).filter(item => item));

const onChange = async (event) => {
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

    delete query.page;

    await navigateTo({ query });
    refresh();
}

const checkFilterUsed = (filterName, optionValue) => {
    const query = route.query;

    return query[`${filterName}[]`] && !!Object.values(query[`${filterName}[]`]).filter(filter => filter == optionValue)[0];
}
</script>
