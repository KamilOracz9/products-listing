import type { IProductFilterDimensions, IProductFilter } from "~/types/productsFilter";
import { toGetParams } from "~/utils";

type IProductsFilterStore = {
    isLoading: boolean;
    isOpen: boolean;
    filters: IProductFilter[];
    activeFilters: [];
    filtersDimensions: IProductFilterDimensions;
    activeFiltersDimensions: {
        width: {
            min: number;
            max: number;
        },
        depth: {
            min: number;
            max: number;
        },
        height: {
            min: number;
            max: number;
        },
    };
}

type IFetchFiltersType = {
    type?: string;
}

const useProductsFilterStore = defineStore('productsFilter', {
    state: (): IProductsFilterStore => ({
        isLoading: false,
        isOpen: false,
        filters: [],
        filtersDimensions: {
            width: {
                label: 'width',
                min: 0,
                max: 0,
                enable: false,
            },
            depth: {
                label: 'depth',
                min: 0,
                max: 0,
                enable: false,
            },
            height: {
                label: 'height',
                min: 0,
                max: 0,
                enable: false,
            },
        },
        activeFiltersDimensions: {
            width: {
                min: 0,
                max: 0,
            },
            depth: {
                min: 0,
                max: 0,
            },
            height: {
                min: 0,
                max: 0,
            },
        },
        activeFilters: [],
    }),
    actions: {
        toggleMenuIsOpen(): void {
            this.isOpen = !this.isOpen;
            const body = document.querySelector('body');

            this.isOpen
                ? body?.classList.add('overflow-hidden')
                : body?.classList.remove('overflow-hidden');
        },
        async fetchFilters(props: IFetchFiltersType) {
            const route = useRoute();

            // const filteredProps = Object.keys(props).map(key => {
            //     if(props[key]) return `${key}=${props[key]}`;
            // }).filter(prop => prop);

            // filteredProps.forEach(element => {
            //     console.log(element)
            // });

            // console.log(filteredProps)

            // filteredParams.map(param => {
            //     console.log('param')
            // })

            // filteredParams.map(({key, value}) => {
            //     console.log('key, value')
            // })

            // const { data } = await useAsyncData(
            //     'productFilters',
            //     () => $fetch(`${useAppConfig().public.apiBase}/pl_PL/products/filters`)
            // )

            // console.log(data.value.attributes)

            // console.log(await $fetch(`${useAppConfig().public.apiBase}/pl_PL/products/filters`))

            this.isLoading = true;

            this.filters = await $fetch(`${useAppConfig().public.apiBase}/pl_PL/products/filters?${toGetParams(props)}`).finally(() => this.isLoading = false);

            if(!this.activeFilters[`collection[]`]) this.activeFilters[`collection[]`] = [];
            // const existingCollections = route.query[`collection[]`];
            // if(typeof(existingCollections) === 'string') this.activeFilters[`collection[]`].push(existingCollections);
            // if(typeof(existingCollections) === 'object') this.activeFilters[`collection[]`] = existingCollections;

            this.filters.attributes.forEach(filter => {
                if(!this.activeFilters[`${filter.name}[]`]) this.activeFilters[`${filter.name}[]`] = [];
                // const existingValue = route.query[`${filter.name}[]`];
                // if(typeof(existingValue) === 'string') this.activeFilters[`${filter.name}[]`].push(existingValue);
                // if(typeof(existingValue) === 'object') this.activeFilters[`${filter.name}[]`] = existingValue;
            })

            // this.activeFilters = this.filters.attributes.map(filter => ({key: `${filter.name}[]`, value: []}))
            // this.filters = await $fetch(`${useAppConfig().public.apiBase}/pl_PL/products/filters`);

            // await import('@/data/productFilters')
            //     .then(response => {
            //         this.filters = <IProductFilter[]>response.default.filters;
            //         this.filtersDimensions = <IProductFilterDimensions>response.default.dimensions;
            //         this.activeFiltersDimensions = {
            //             width: {
            //                 min: this.filtersDimensions.width.min,
            //                 max: this.filtersDimensions.width.max,
            //             },
            //             depth: {
            //                 min: this.filtersDimensions.depth.min,
            //                 max: this.filtersDimensions.depth.max,
            //             },
            //             height: {
            //                 min: this.filtersDimensions.height.min,
            //                 max: this.filtersDimensions.height.max,
            //             },
            //         }

            //         const query = router.currentRoute.value.query;

            //         Object.keys(query).forEach(key => {
            //             const splitedKeys = key.split('_');

            //             if (Object.keys(this.activeFiltersDimensions).includes(splitedKeys[0])) {
            //                 this.activeFiltersDimensions[splitedKeys[0]][splitedKeys[1]] = query[key];
            //             }
            //         });
            //     })
            //     .finally(() => this.isLoading = false);
        },
    },
});

export default useProductsFilterStore;