import type { IGroupedLocation, ILocation, ILocationType } from "~/types";
import { useLocationsStore } from '~/stores/locationsStore';

type IFiltersStore = {
    type: ILocationType | null;
    hasRoute: string | null;
    number: string | null;
    name: string | null;
}

export const useFiltersStore = defineStore('filters', {
    state: (): IFiltersStore => ({
        type: null,
        hasRoute: null,
        number: null,
        name: null,
    }),
    getters: {
        isRouteSet: (state) => state.hasRoute !== null ? !!parseInt(state.hasRoute) : null,
    },
    actions: {
        filter() {
            const locationsStore = useLocationsStore();
            let locations = locationsStore.locations;
            let groupedLocations = JSON.parse(JSON.stringify(locationsStore.groupedLocations));

            locations = locations.filter(location => this.number !== null ? location.name.includes(this.number) : location);
            
            locations = locations.filter(location => this.name !== null ? location.address.delivery_name.toLocaleLowerCase().includes(this.name.toLocaleLowerCase()) : location);

            locations = locations.filter(location => {
                return this.type ? (location.type === this.type) : location.type;
            });

            locations = locations.filter(location => {
                return this.isRouteSet !== null ? (this.isRouteSet ? !!location.route_name : !location.route_name) : location;
            });

            locationsStore.activeLocations = locations;

            if (this.type !== null || this.isRouteSet !== null || this.number !== null || this.name !== null) {
                locationsStore.groupedActiveLocations = groupedLocations.map((groupedLocation: IGroupedLocation) => {
                    const items = (<IGroupedLocation>groupedLocation).items?.filter(item => locations.find(location => location.id === item.id))
                    
                    groupedLocation.items = items;

                    return groupedLocation;
                });
            } else locationsStore.groupedActiveLocations = groupedLocations;
        },
    },
})