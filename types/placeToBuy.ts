export type IVoievodship = {
    value: string;
    label: string;
}

export type ICity = {
    value: string;
    label: string;
}

export type ILocation = {
    title: string;
    subtitle: string;
    contact: {
        address: string,
        phone: string
    },
    coords: {
        lat: number,
        lng: number,
    },
}