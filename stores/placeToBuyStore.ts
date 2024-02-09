import type { IBreadCrumb } from "~/types"
import type { ICity, IVoievodship } from "~/types/placeToBuy";

export type IPlaceToBuyStore = {
    isLoading: boolean;
    breadcrumbs: IBreadCrumb[];
    voievodships: {
        isLoading: boolean;
        items: IVoievodship[];
    },
    cities: {
        isLoading: boolean;
        items: ICity[];
    },
}

const usePlaceToBuyStore = defineStore('placeToBuy', {
    state: (): IPlaceToBuyStore => ({
        isLoading: true,
        breadcrumbs: [],
        voievodships: {
            isLoading: false,
            items: [],
        },
        cities: {
            isLoading: false,
            items: [],
        },
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/place-to-buy')
                .then(response => {
                    this.breadcrumbs = response.default.breadcrumbs;
                })
                .finally(() => this.isLoading = false);
        },
        async fetchVoievodships() {
            this.voievodships.isLoading = true;

            await import('@/data/place-to-buy')
                .then(response => {
                    this.voievodships.items = response.voievodships;
                })
                .finally(() => this.voievodships.isLoading = false);
        },
        async fetchCities() {
            this.cities.isLoading = true;

            await import('@/data/place-to-buy')
                .then(response => {
                    this.cities.items = response.cities;
                })
                .finally(() => this.cities.isLoading = false);
        },
    }
})

export default usePlaceToBuyStore;