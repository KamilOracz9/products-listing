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