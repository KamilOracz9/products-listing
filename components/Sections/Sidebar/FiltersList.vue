<template>
    <ul class="flex flex-col gap-8">
        <template v-for="[filterCategory, options] in Object.entries(filters)">
            <li v-if="(getFilterOptions(options, filterCategory).length > 1 || filterCategory === 'is_new') || filterCategory === slugify($t('filters.series'))"
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
                            @change="(event) => onChange(getName(filterCategory), option.value, event.target.checked)"
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
const router = useRouter();
const { filters, allFilters } = toRefs(props);
const seriesSearch = ref('');
const i18n = useI18n();

const getName = (filterCategory) => {
    const result = `${filterCategory === 'is_new' ? slugify(i18n.t('filters.is_new')) : filterCategory}${filterCategory === 'is_new' ? '' : '[]'}`;

    return result;
}

const params = ref(
    Object.entries(route.query)
        .map(param =>
            typeof param[1] === 'object'
                ? param[1].map((value) => `${param[0]}=${value}`)
                : [`${param[0]}=${param[1]}`]
        )
        .flat()
        .filter(param => !param.startsWith('page='))
);

const rangeKeys = new Set(['length', 'length', 'width', 'width', 'height', 'height'])

const matchesRanges = (product, selected) => {
    // if (selected.width?.[0]  && product.width  == selected.width[0])  return false
    // if (selected.length?.[0] && product.length == selected.length_min[0]) return false
    // if (selected.height?.[0] && product.height == selected.height_min[0]) return false
    return true
}

const filterFilters = () => {
    if (params.value.length === 0) {
        Object.keys(filters.value).forEach(key => {
            (filters.value[key] ?? []).forEach(item => { item.disabled = false })
        })
        return
    }

    const selectedFilters = {}
    params.value.forEach(param => {
        const [rawKey, filterValue] = param.split('=')
        let filterName = rawKey.replace('[]', '')
        if (filterName === slugify(i18n.t('filters.is_new'))) filterName = 'is_new'
        if (!selectedFilters[filterName]) selectedFilters[filterName] = []
        selectedFilters[filterName].push(filterValue)
    })

    Object.keys(filters.value).forEach(categoryKey => {
        (filters.value[categoryKey] ?? []).forEach(option => {
            // zbuduj testowe filtry dla tej opcji
            const testSelected = {}
            Object.entries(selectedFilters).forEach(([key, values]) => {
                if (key !== categoryKey) testSelected[key] = [...values]
            })
            testSelected[categoryKey] = [option.value.toString()]

            const hasMatchingProducts = allFilters.value.some(product => {
                // sprawdź zakresy
                if (!matchesRanges(product, testSelected)) return false

                // sprawdź pozostałe filtry (nie zakresy)
                return Object.entries(testSelected).every(([key, values]) => {
                    if (rangeKeys.has(key)) return true
                    return values.some(value => product[key] == value)
                })
            })

            option.disabled = !hasMatchingProducts
        })
    })
}

const updateQueryParam = debounce((newParams) => {
    router.replace(`?${newParams.join('&')}`)
}, 500)

watch(params, (newVal) => {
    updateQueryParam(newVal);

    filterFilters();
})

const onChange = (filterCategory, value) => {
    const param = `${filterCategory}=${value}`
    let newParams = params.value.filter(item => !item.includes('page='))

    if (newParams.includes(param)) {
        newParams = newParams.filter(item => item !== param)
    } else {
        newParams.push(param)
    }

    params.value = [...newParams];

    filterFilters();

    updateQueryParam(newParams)
}

const getSelectedParams = () => {
    return params.value
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
