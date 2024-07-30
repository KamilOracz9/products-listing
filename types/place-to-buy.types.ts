import type { Page } from "./common.types";

export interface PlaceToBuyPage extends Page
{
    locationsList: Location[];
}

export type Location = {
    title: string;
    subtitle?: string;
    contact: {
        address: string,
        phone: string
    },
    coords: {
        lat: number,
        lng: number,
    },
}