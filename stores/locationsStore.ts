import { defineStore } from 'pinia';
import { fetchCoords } from '~/libs/osm/api';

type ILocationsStore = {
    locations: (void | number[] | undefined)[],
    activeLocationId: number | null,
}

export const useLocationsStore = defineStore('locations', {
    state: (): ILocationsStore => ({
        locations: [],
        activeLocationId: 0,
    }),
    getters: {
        getActiveLocation: (state) => state.activeLocationId,
    },
    actions: {
        // async setLocations(response: (void | number[] | undefined)[]): Promise<void> {
        //     this.locations = response;
        // },
        setActiveLocation(id: number) {
            this.activeLocationId = id;
        },
        async fetchLocations() {
            const config = useRuntimeConfig();
            const url = `${config.public.apiProtocol}:\\\/${config.public.apiBase}/api/v1/service-orders`;

            await fetch(url).then(response => (response.json())).then(response => this.locations = response.data);
        },
    },
})