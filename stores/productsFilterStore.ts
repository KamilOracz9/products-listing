import type { IProductFilterDimensions, IProductFilter } from "~/types/productsFilter";

type IProductsFilterStore = {
    isLoading: boolean;
    isOpen: boolean;
    filters: IProductFilter[];
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
        }
    }),
    actions: {
        toggleMenuIsOpen(): void {
            this.isOpen = !this.isOpen;
            const body = document.querySelector('body');

            this.isOpen
                ? body?.classList.add('overflow-hidden')
                : body?.classList.remove('overflow-hidden');
        },
        async fetchFilters() {
            this.isLoading = true;

            await import('@/data/productFilters')
                .then(response => {
                    this.filters = <IProductFilter[]>response.default.filters;
                    this.filtersDimensions = <IProductFilterDimensions>response.default.dimensions;
                    this.activeFiltersDimensions = {
                        width: {
                            min: this.filtersDimensions.width.min,
                            max: this.filtersDimensions.width.max,
                        },
                        depth: {
                            min: this.filtersDimensions.depth.min,
                            max: this.filtersDimensions.depth.max,
                        },
                        height: {
                            min: this.filtersDimensions.height.min,
                            max: this.filtersDimensions.height.max,
                        },
                    }
                })
                .finally(() => this.isLoading = false);
        },
    },
});

export default useProductsFilterStore;