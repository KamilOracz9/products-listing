<template>
    <ul class="flex flex-col gap-8">
        <template v-for="[filterCategory, options] in Object.entries(filters)">
            <li v-if="getFilterOptions(options, filterCategory).length"
                class="flex flex-col gap-4 border-b border-gray-1 pb-4">
                <span class="font-medium uppercase">{{ labels[filterCategory] }}</span>
                <input v-model="seriesSearch" v-if="filterCategory === slugify($t('filters.series'))" type="text"
                    :placeholder="$t('search')" class="border rounded-[3px] p-1" />
                <ul class="max-h-[150px] overflow-y-auto">
                    <li v-for="option in getFilterOptions(options, filterCategory)"
                        class="flex gap-3 items-center group">
                        <input class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                            :name="getName(filterCategory)" :value="option.value"
                            :disabled="option.disabled && !getSelectedParams().includes(`${getName(filterCategory)}=${option.value.toString()}`)"
                            type="checkbox" :id="`option-${option.value}`"
                            @change="() => onChange(`${getName(filterCategory)}`, option.value)"
                            :checked="getSelectedParams().includes(`${getName(filterCategory)}=${option.value.toString()}`)" />
                        <label :for="`option-${option.value}`" class="break-keep whitespace-nowrap"
                            :class="option.disabled && !getSelectedParams().includes(`${getName(filterCategory)}=${option.value.toString()}`) ? 'text-gray-4' : 'text-black'">
                            {{ filterCategory === 'is_new' ? i18n.t('filters.is_new') : option.label }}
                        </label>
                    </li>
                </ul>
            </li>
        </template>
    </ul>
</template>

<script setup>
import debounce from 'debounce';

const props = defineProps(['filters', 'allFilters', 'labels']);
const route = useRoute();
const { filters, allFilters, labels } = toRefs(props);
const router = useRouter()
const seriesSearch = ref('');
const i18n = useI18n();

const getName = (filterCategory) => {
    return `${filterCategory === 'is_new' ? slugify(i18n.t('filters.is_new')) : filterCategory}${filterCategory === 'is_new' ? '' : '[]'}`
}

const params = ref(
    Object.entries(route.query)
        .map(param =>
            typeof param[1] === 'object'
                ? param[1].map((value) => `${param[0]}=${value}`)
                : [`${param[0]}=${param[1]}`]
        )
        .flat()
)

const filterFilters = (excludeCategory = null) => {
    filters.value = props.filters;

    if (params.value.length === 0) {
        Object.keys(filters.value).forEach(key => {
            (filters.value[key] ?? []).forEach(item => {
                item.disabled = false;
            });
        });
        return;
    }

    const selectedFilters = {};
    params.value.forEach(param => {
        const itemArray = param.split('=');
        let filterName = itemArray[0].replace('[]', '');
        if (filterName === slugify(i18n.t('filters.is_new'))) filterName = 'is_new';
        const filterValue = itemArray[1];

        if (!selectedFilters[filterName]) {
            selectedFilters[filterName] = [];
        }
        selectedFilters[filterName].push(filterValue);
    });

    Object.keys(filters.value).forEach(categoryKey => {
        (filters.value[categoryKey] ?? []).forEach(option => {
            const testFilters = {};
            
            Object.entries(selectedFilters).forEach(([key, values]) => {
                if (key !== categoryKey) {
                    testFilters[key] = [...values];
                }
            });
            
            testFilters[categoryKey] = [option.value.toString()];
            
            const hasMatchingProducts = allFilters.value.some((product) => {
                const matches = Object.entries(testFilters).every(([key, values]) => {
                    return values.some(value => product[key] == value);
                });
                return matches;
            });

            option.disabled = !hasMatchingProducts;
        });
    });
}

const updateQueryParam = debounce((newParams) => {
    router.replace(`?${newParams.join('&')}`)
}, 1000)

watch(params, (newVal) => {
    updateQueryParam(newVal);

    filterFilters();
})

const onChange = (filterCategory, value) => {
    const param = `${filterCategory}=${value}`
    let newParams = params.value.filter(item => !item.includes('page='))

    if (filterCategory === 'length_min') newParams = params.value.filter(item => !item.includes('length_min[]='))
    if (filterCategory === 'length_max') newParams = params.value.filter(item => !item.includes('length_max[]='))
    if (filterCategory === 'width_min') newParams = params.value.filter(item => !item.includes('width_min[]='))
    if (filterCategory === 'width_max') newParams = params.value.filter(item => !item.includes('width_max[]='))
    if (filterCategory === 'height_min') newParams = params.value.filter(item => !item.includes('height_min[]='))
    if (filterCategory === 'height_max') newParams = params.value.filter(item => !item.includes('height_max[]='))

    if (newParams.includes(param)) {
        newParams = newParams.filter(item => item !== param)
    } else {
        if (filterCategory === 'length_min' && dimensions.length.min == value) { }
        else if (filterCategory === 'length_max' && dimensions.length.max == value) { }
        else if (filterCategory === 'width_min' && dimensions.width.min == value) { }
        else if (filterCategory === 'width_max' && dimensions.width.max == value) { }
        else if (filterCategory === 'height_min' && dimensions.height.min == value) { }
        else if (filterCategory === 'height_max' && dimensions.height.max == value) { }
        else newParams.push(param)
    }

    params.value = [...newParams];

    filterFilters();
    
    updateQueryParam(newParams)
}

const getSelectedParams = () => {
    return Object.entries(route.query).map(item => {
        const filter = item.join('=').split('=');

        return filter[1].split(',').map(item => `${filter[0]}=${item}`)
    }).flat()
}

const getFilterOptions = (options, name) => {
    if (name === slugify(i18n.t('filters.series'))) return options.filter(option => option.label.toLocaleLowerCase().includes(seriesSearch.value.toLocaleLowerCase()))
    return options;
}

onMounted(() => {
    watch(seriesSearch, value => {
        localStorage.setItem('seriesSearch', value);
    });

    seriesSearch.value = localStorage.getItem('seriesSearch') ?? '';

    filterFilters();
})
</script>
