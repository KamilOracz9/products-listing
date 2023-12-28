import concat from 'lodash/concat';
import { defineStore } from 'pinia';
import type { IActiveLocation, IGroupedLocation, ILocation } from '~/types';

type ILocationsStore = {
    locations: Array<ILocation>;
    activeLocations: Array<ILocation>;
    groupedLocations: Array<IGroupedLocation>;
    groupedActiveLocations: Array<IGroupedLocation>;
    activeLocationId: string | null;
    activeLocation: IActiveLocation | null;
}

export const useLocationsStore = defineStore('locations', {
    state: (): ILocationsStore => ({
        locations: [],
        activeLocations: [],
        groupedLocations: [],
        groupedActiveLocations: [],
        activeLocationId: '',
        activeLocation: null,
    }),
    actions: {
        async setActiveLocation(id: string) {
            this.activeLocationId = this.activeLocationId === id ? null : id;

            if(this.activeLocationId) {
                const activeLocation = this.activeLocations.filter((location: ILocation) => location.id === this.activeLocationId)[0];
                await this.fetchActiveLocation(id).then(response => (<IActiveLocation>activeLocation).services = response);

                this.activeLocation = (<IActiveLocation>activeLocation);
            }else this.activeLocation = null;
        },
        async fetchLocations() {
            const config = useRuntimeConfig();
            const url = `http:\\\\192.168.1.252:20384/api/v2/service-orders`;

            await fetch(url).then(response => (response.json())).then(response => {
                const locations = concat(...Object.values(response.data).map(location => (location.items))).filter((location: ILocation) => location.address.delivery_latitude);
                const groupedLocations = Object.values(response.data).filter(location => location.latitude && location.longitude);

                this.locations = locations;
                this.activeLocations = locations;
                this.groupedLocations = groupedLocations;
                this.groupedActiveLocations = groupedLocations;
            });
        },
        async fetchActiveLocation(id: string) {
            const config = useRuntimeConfig();
            const url = `${config.public.apiProtocol}:\\\\${config.public.apiBase}/api/v2/service-orders/show/${id}`;

            return await fetch(url).then(response => (response.json())).then(response => (response.data))
        },
    },
})