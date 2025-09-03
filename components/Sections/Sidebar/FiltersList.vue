<template>
    <ul class="flex flex-col gap-8">
        <!-- <li class="flex gap-3 items-center group">
            <input class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black" :name="`is_new`"
                :value="1" type="checkbox" :id="'is_new'"
                @change="() => onChange(slugify($t('filters.is_new')), '1')"
                :checked="getSelectedParams().includes(`${slugify($t('filters.is_new'))}=1`)"
                />
            <label :for="`is_new`" class="text-black">
                {{ $t('filters.is_new') }}
            </label>
        </li> -->

        <li v-for="[filterCategory, options] in Object.entries(filters)"
            class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ labels[filterCategory] }}</span>
            <input v-model="seriesSearch" v-if="filterCategory === 'series'" type="text" :placeholder="$t('search')"
                class="border rounded-[3px] p-1" />
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="option in options" class="flex gap-3 items-center group">
                    <input class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                        :name="getName(filterCategory)" :value="option.value"
                        :disabled="option.disabled && !getSelectedParams().includes(`${getName(filterCategory)}=${option.value.toString()}`)"
                        type="checkbox" :id="`option-${option.value}`"
                        @change="() => onChange(`${getName(filterCategory)}`, option.value)"
                        :checked="getSelectedParams().includes(`${getName(filterCategory)}=${option.value.toString()}`)" />
                    <label :for="`option-${option.value}`"
                        :class="option.disabled && !getSelectedParams().includes(`${getName(filterCategory)}=${option.value.toString()}`) ? 'text-gray-4' : 'text-black'">
                        {{ filterCategory === 'is_new' ? i18n.t('filters.is_new') : option.label }}
                    </label>
                </li>
            </ul>
        </li>
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

const filterFilters = () => {
    filters.value = props.filters;

    const results = Object.fromEntries(
        Object.keys(filters.value).map(item => [
            item,
            [Object.fromEntries(Object.keys(filters.value).map(subitem => [
                subitem,
                new Set
            ]))][0]
        ])
    );

    if (params.value.length) {
        params.value.forEach(item => {
            const itemArray = item.split('=')
            let filterName = itemArray[0].replace('[]', '')
            
            if(filterName === slugify(i18n.t('filters.is_new'))) filterName = 'is_new';

            const filterValue = itemArray[1]

            const result = {};

            const filter = Object.fromEntries([[filterName, filterValue]]);

            const extractUnique = (list, key) => [...new Set(list.map((item) => item[key]))];

            const matched = allFilters.value.filter((item) =>
                Object.entries(filter).every(([key, value]) => item[key] == value)
            );

            Object.keys(allFilters.value[0]).forEach(key => {
                if (filter.hasOwnProperty(key)) {
                    result[key] = [];
                } else {
                    const allValues = new Set(extractUnique(allFilters.value, key));
                    const matchedValues = new Set(extractUnique(matched, key));

                    const diff = [...allValues].filter(val => matchedValues.has(val)).filter(item => item !== null);

                    result[key] = diff;
                }
            });

            Object.entries(result).forEach(item => {
                if (results[filterName] && results[filterName][item[0]]) {
                    results[filterName][item[0]].add(item[1])
                }
            })
        })
    }

    const disabledFilters = Object.fromEntries(
        Object.keys(filters.value).map(key => [
            key,
            Object.entries(results).map(item => ([...results[item[0]][key]].flat())).filter(item => item.length),
        ])
    );

    Object.fromEntries(
        Object.keys(filters.value).map(key => [
            key,
            (filters.value[key] ?? []).map((item) => {
                if (disabledFilters[key].length) item.disabled = !findCommonElements(disabledFilters[key]).includes(item.value)
                else item.disabled = false

                return item
            })
        ])
    )
}

function findCommonElements(arr) {
    let arrCopy = arr.slice();
    let commonElements = arrCopy.shift().filter(function (v) {
        return arrCopy.every(function (a) {
            return a.indexOf(v) !== -1;
        });
    });

    return commonElements;
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

    updateQueryParam(newParams)
}

const getSelectedParams = () => {
    return Object.entries(route.query).map(item => {
        const filter = item.join('=').split('=');

        return filter[1].split(',').map(item => `${filter[0]}=${item}`)
    }).flat()
}

onMounted(() => {
    watch(seriesSearch, value => {
        localStorage.setItem('seriesSearch', value);
    });

    seriesSearch.value = localStorage.getItem('seriesSearch') ?? '';

    filterFilters();
})
</script>
