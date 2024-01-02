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
    isLoading: boolean;
}

export const useLocationsStore = defineStore('locations', {
    state: (): ILocationsStore => ({
        locations: [],
        activeLocations: [],
        groupedLocations: [],
        groupedActiveLocations: [],
        activeLocationId: '',
        activeLocation: null,
        isLoading: false,
    }),
    actions: {
        async setActiveLocation(id: string) {
            this.activeLocationId = this.activeLocationId === id ? null : id;

            if (this.activeLocationId) {
                const activeLocation = this.activeLocations.filter((location: ILocation) => location.id === this.activeLocationId)[0];
                if (activeLocation.zse_id) await this.fetchActiveLocationServices(activeLocation.zse_id).then(response => (<IActiveLocation>activeLocation).services = response);
                this.activeLocation = (<IActiveLocation>activeLocation);
            } else this.activeLocation = null;

            return !!this.activeLocation;
        },
        async fetchLocations() {
            const config = useRuntimeConfig();
            const url = `${config.public.apiProtocol}:\\\\${config.public.apiBase}/api/v2/service-orders`;
            this.isLoading = true;

            await fetch(url).then(response => (response.json())).then(response => {
                const locations = (<ILocation[]>concat(...(<IGroupedLocation[]>Object.values(response.data)).map((location) => (location.items))))
                    .filter((location) => location.address.delivery_latitude);
                const groupedLocations = (<IGroupedLocation[]>Object.values(response.data)).filter((location) => location.latitude && location.longitude);

                this.locations = <ILocation[]>locations;
                this.activeLocations = <ILocation[]>locations;
                this.groupedLocations = <IGroupedLocation[]>groupedLocations;
                this.groupedActiveLocations = <IGroupedLocation[]>groupedLocations;
            });

            await nextTick();

            this.isLoading = false;
        },
        async fetchActiveLocationServices(id: string) {
            const config = useRuntimeConfig();
            const url = `${config.public.apiProtocol}:\\\\${config.public.apiBase}/api/v2/service-orders/show/${id}`;

            return await fetch(url).then(response => (response.json())).then(response => (response.data))
        },
    },
})