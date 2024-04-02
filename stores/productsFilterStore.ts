import type { IProductFilterDimensions, IProductFilter } from "~/types/productsFilter";

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
        length: {
            min: number;
            max: number;
        },
        height: {
            min: number;
            max: number;
        },
    };
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
            length: {
                label: 'length',
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
            length: {
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
    },
});

export default useProductsFilterStore;