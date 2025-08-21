<template>
    <ul class="flex flex-col gap-8">
        <li v-for="[filterCategory, options] in Object.entries(filters)"
            class="flex flex-col gap-4 border-b border-gray-1 pb-4">
            <span class="font-medium uppercase">{{ $t(`filters.${filterCategory}`) }}</span>
            <input v-model="seriesSearch" v-if="filterCategory === 'series'" type="text" :placeholder="$t('search')"
                class="border rounded-[3px] p-1" />
            <ul class="max-h-[150px] overflow-y-auto">
                <li v-for="option in options" class="flex gap-3 items-center group">
                    <input class="border border-black w-4 h-4 focus:ring-0 disabled:border-gray-4 text-black"
                        :name="`${filterCategory}[]`" :value="option.value"
                        :disabled="option.disabled && !getSelectedParams().includes(`${filterCategory}[]=${option.value.toString()}`)"
                        type="checkbox" :id="`option-${option.value}`"
                        @change="() => onChange(filterCategory, option.value)"
                        :checked="getSelectedParams().includes(`${filterCategory}[]=${option.value.toString()}`)" />
                    <label :for="`option-${option.value}`" :class="option.disabled && !getSelectedParams().includes(`${filterCategory}[]=${option.value.toString()}`) ? 'text-gray-4' : 'text-black'">
                        {{ option.label }}
                    </label>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
import debounce from 'debounce';

const props = defineProps(['filters', 'allFilters']);
const route = useRoute();
const { filters, allFilters } = toRefs(props);
const refresh = inject('refresh');
const router = useRouter()
const seriesSearch = ref('');

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

    const results = {
        series: {
            series: new Set,
            product_color: new Set,
            product_detail_finishing: new Set,
            product_door_type: new Set,
            product_doors_count: new Set,
            product_shape: new Set,
        },
        product_color: {
            series: new Set,
            product_color: new Set,
            product_detail_finishing: new Set,
            product_door_type: new Set,
            product_doors_count: new Set,
            product_shape: new Set,
        },
        product_detail_finishing: {
            series: new Set,
            product_color: new Set,
            product_detail_finishing: new Set,
            product_door_type: new Set,
            product_doors_count: new Set,
            product_shape: new Set,
        },
        product_door_type: {
            series: new Set,
            product_color: new Set,
            product_detail_finishing: new Set,
            product_door_type: new Set,
            product_doors_count: new Set,
            product_shape: new Set,
        },
        product_doors_count: {
            series: new Set,
            product_color: new Set,
            product_detail_finishing: new Set,
            product_door_type: new Set,
            product_doors_count: new Set,
            product_shape: new Set,
        },
        product_shape: {
            series: new Set,
            product_color: new Set,
            product_detail_finishing: new Set,
            product_door_type: new Set,
            product_doors_count: new Set,
            product_shape: new Set,
        },
    };

    if (params.value.length) {
        params.value.forEach(item => {
            const itemArray = item.split('=')
            const filterName = itemArray[0].replace('[]', '')
            const filterValue = itemArray[1]

            const result = {};

            const filter = Object.fromEntries([[filterName, parseInt(filterValue)]]);

            const extractUnique = (list, key) => [...new Set(list.map((item) => item[key]))];

            const matched = allFilters.value.filter((item) =>
                Object.entries(filter).every(([key, value]) => item[key] === value)
            );

            Object.keys(allFilters.value[0]).forEach(key => {
                if (filter.hasOwnProperty(key)) {
                    result[key] = [];
                } else {
                    const allValues = new Set(extractUnique(allFilters.value, key));
                    const matchedValues = new Set(extractUnique(matched, key));

                    const diff = [...allValues].filter(val => matchedValues.has(val)).filter(item => item);
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

    const disableSeries = Object.entries(results).map(item => ([...results[item[0]].series].flat())).filter(item => item.length);
    const disableProductColors = Object.entries(results).map(item => ([...results[item[0]].product_color].flat())).filter(item => item.length);
    const disableProductDetailFinishings = Object.entries(results).map(item => ([...results[item[0]].product_detail_finishing].flat())).filter(item => item.length);
    const disableProductDoorsTypes = Object.entries(results).map(item => ([...results[item[0]].product_door_type].flat())).filter(item => item.length);
    const disableProductDoorsCount = Object.entries(results).map(item => ([...results[item[0]].product_doors_count].flat())).filter(item => item.length);
    const disableProductShapes = Object.entries(results).map(item => ([...results[item[0]].product_shape].flat())).filter(item => item.length);

    filters.value = {
        ...filters.value,
        series: (filters.value.series ?? []).map((item) => {
            if (disableSeries.length) item.disabled = !findCommonElements(disableSeries).includes(item.value)
            else item.disabled = false

            return item
        }),
        product_color: (filters.value.product_color ?? []).map(
            (item) => {
                if (disableProductColors.length) item.disabled = !findCommonElements(disableProductColors).includes(item.value)
                else item.disabled = false

                return item
            }
        ),
        product_detail_finishing: (filters.value.product_detail_finishing ?? []).map(
            (item) => {
                if (disableProductDetailFinishings.length) item.disabled = !findCommonElements(disableProductDetailFinishings).includes(item.value)
                else item.disabled = false

                return item
            }
        ),
        product_door_type: (filters.value.product_door_type ?? []).map(
            (item) => {
                if (disableProductDoorsTypes.length) item.disabled = !findCommonElements(disableProductDoorsTypes).includes(item.value)
                else item.disabled = false

                return item
            }
        ),
        product_doors_count: (filters.value.product_doors_count ?? []).map(
            (item) => {
                if (disableProductDoorsCount.length) item.disabled = !findCommonElements(disableProductDoorsCount).includes(item.value)
                else item.disabled = false

                return item
            }
        ),
        product_shape: (filters.value.product_shape ?? []).map(
            (item) => {
                if (disableProductShapes.length) item.disabled = !findCommonElements(disableProductShapes).includes(item.value)
                else item.disabled = false

                return item
            }
        )
    }
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
    const param = `${filterCategory}[]=${value}`
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
