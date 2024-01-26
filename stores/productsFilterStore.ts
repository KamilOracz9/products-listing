import type { IProductFilterDimensions } from "~/types/productsFilter";

type IProductsFilterStore = {
    isLoading: boolean;
    isOpen: boolean;
    filters: IProductsFilterStore[];
    filtersDimensions: IProductFilterDimensions[];
}

const useProductsFilterStore = defineStore('productsFilter', {
    state: (): IProductsFilterStore => ({
        isLoading: false,
        isOpen: false,
        filters: [],
        filtersDimensions: [],
    }),
    actions: {},
});

export default useProductsFilterStore;