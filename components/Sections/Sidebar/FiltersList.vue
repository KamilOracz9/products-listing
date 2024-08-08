<template>
    <ul class="flex flex-col gap-8">
        <li v-for="(options, name) in filters" class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ $t(`filters.${name}`) }}</span>
            <input v-model="seriesSearch" v-if="name === 'series'" type="text" :placeholder="$t('search')"
                class="border rounded-[3px] p-1" />
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="option in getFilterOptions(options, name)" class="flex gap-3 items-center group">
                    <input :checked="checkFilterUsed(`${name}`, option.value)" :name="`${name}`" :value="option.value"
                        :disabled="isDisabled(isActive(name, option.value), option.disabled)" @change="onChange"
                        type="checkbox" class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                        :id="`${name}-${option.value}`" />
                    <label :for="`${name}-${option.value}`"
                        :class="isDisabled(isActive(name, option.value), option.disabled) ? 'text-gray-4' : 'text-black'">
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
const seriesSearch = ref('');

const isDisabled = (active, disabled) => (!active && disabled);
const isActive = (name, value) => {
    if (Array.isArray(route.query[`${name}[]`])) return route.query[`${name}[]`].includes(value.toString());
    else return route.query[`${name}[]`] == value;
};

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
        } else {
            delete query[key];
        }
    }

    delete query.page;

    await navigateTo({ query });
    refresh();
}

const checkFilterUsed = (filterName, optionValue) => {
    const query = route.query;

    if (typeof (query[`${filterName}[]`]) === 'string') return query[`${filterName}[]`] == optionValue;

    return query[`${filterName}[]`] && !!Object.values(query[`${filterName}[]`]).filter(filter => filter == optionValue)[0];
}

const getFilterOptions = (options, name) => {
    if (name === 'series') return options.filter(option => option.label.toLocaleLowerCase().includes(seriesSearch.value.toLocaleLowerCase()))
    return options;
}

onMounted(() => {
    watch(seriesSearch, value => {
        localStorage.setItem('seriesSearch', value);
    });

    seriesSearch.value = localStorage.getItem('seriesSearch') ?? '';
})
</script>
