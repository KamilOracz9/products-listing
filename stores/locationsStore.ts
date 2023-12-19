import { defineStore } from 'pinia';
import type { ILocation } from '~/types';

type ILocationsStore = {
    locations: Array<ILocation>,
    activeLocationId: string | null,
}

export const useLocationsStore = defineStore('locations', {
    state: (): ILocationsStore => ({
        locations: [],
        activeLocationId: '',
    }),
    getters: {
        getActiveLocation: (state) => (state.locations.filter(location => location.id === state.activeLocationId)[0]),
    },
    actions: {
        setActiveLocation(id: string) {
            this.activeLocationId = id;
        },
        async fetchLocations() {
            const config = useRuntimeConfig();
            const url = `${config.public.apiProtocol}:\\\/${config.public.apiBase}/api/v1/service-orders`;

            await fetch(url).then(response => (response.json())).then(response => this.locations = response.data);
        },
        closeAllData() {
            document.querySelectorAll('.marker__data').forEach((element) => {
                element.style.display = 'none';
            });
        },
    },
})