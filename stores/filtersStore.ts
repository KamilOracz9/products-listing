import type { ILocationType } from "~/types";
import { useLocationsStore } from '~/stores/locationsStore';

type IFiltersStore = {
    type: ILocationType | null;
}

export const useFiltersStore = defineStore('filters', {
    state: (): IFiltersStore => ({
        type: null,
    }),
    actions: {
        filter() {
            const locationsStore = useLocationsStore();
            let locations = locationsStore.locations;

            locations = locations.filter(location => {
                return this.type ? (location.type === this.type) : location.type;
            });

            locationsStore.activeLocations = locations;
        },
    },
})