import type { IGroupedLocation, ILocation, ILocationType } from "~/types";
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
            let groupedLocations = JSON.parse(JSON.stringify(locationsStore.groupedLocations));

            locations = locations.filter(location => {
                return this.type ? (location.type === this.type) : location.type;
            });

            locationsStore.activeLocations = locations;

            if (this.type) {
                locationsStore.groupedActiveLocations = groupedLocations.map((groupedLocation: IGroupedLocation) => {
                    const items = (<IGroupedLocation>groupedLocation).items?.filter(item => locations.find(location => location.id === item.id))
                    
                    groupedLocation.items = items;

                    return groupedLocation;
                });
            } else locationsStore.groupedActiveLocations = groupedLocations;
        },
    },
})