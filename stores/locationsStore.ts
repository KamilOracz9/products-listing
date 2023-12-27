import { defineStore } from 'pinia';
import type { ILocation } from '~/types';

type ILocationsStore = {
    locations: Array<ILocation>,
    activeLocations: Array<ILocation>,
    activeLocationId: string | null,
}

export const useLocationsStore = defineStore('locations', {
    state: (): ILocationsStore => ({
        locations: [],
        activeLocations: [],
        activeLocationId: '',
    }),
    getters: {
        getActiveLocation: (state) => (state.locations.filter(location => location.id === state.activeLocationId)[0]),
    },
    actions: {
        setActiveLocation(id: string) {
            this.activeLocationId = this.activeLocationId === id ? null : id;
        },
        async fetchLocations() {
            const config = useRuntimeConfig();
            const url = `${config.public.apiProtocol}:\\\\${config.public.apiBase}/api/v1/service-orders`;

            await fetch(url).then(response => (response.json())).then(response => {
                const data = response.data.filter((location: ILocation) => location.address.delivery_latitude);

                this.locations = data;
                this.activeLocations = data;
            });

            console.log('asd')
        },
    },
})