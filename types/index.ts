type ILocationAddress = {
    delivery_city: string;
    delivery_email: string | null;
    delivery_latitude: number | null;
    delivery_longitude: number | null;
    delivery_name: string;
    delivery_phone: string;
    delivery_postcode: string;
    delivery_street: string;
    __database_postcode: string;
    __databse_name: string;
}

type INearestCity = {
    name: string;
    postcode: string;
    latitude: number;
    longitude: number;
};

type IActiveLocationService = {
    code: string;
    count: string;
    name: string;
}

export type ILocation = {
    address: ILocationAddress;
    expired_date: string | null;
    id: string;
    installation_date: string | null;
    name: string;
    route_name: string | null;
    route_color: string | null;
    type: ILocationType;
    zseu_count: number;
    expired_status_id: IExpiredStatusId;
    nearest_city: INearestCity | null;
    zse_id: string | null;
};

export type IExpiredStatusId = 0 | 1 | 2 | null;

export type ILocationType = "USE" | "ZSEU";

export type IIcon = {
    expiredStatusId: IExpiredStatusId | null;
    locationType: ILocationType;
    markerSize: number;
}

export type IGroupedLocation = {
    postcode: string;
    latitude: number;
    longitude: number;
    items: Array<ILocation> | undefined;
}

export type IActiveLocation = ILocation & {
    services: Array<IActiveLocationService>;
}