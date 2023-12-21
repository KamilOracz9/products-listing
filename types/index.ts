type ILocationAddress = {
    delivery_city: string;
    delivery_email: string | null;
    delivery_latitude: string | null;
    delivery_longitude: string | null;
    delivery_name: string;
    delivery_phone: string;
    delivery_postcode: string;
    delivery_street: string;
    __database_postcode: string;
    __databse_name: string;
}

export type ILocation = {
    address: ILocationAddress;
    expired_date: string | null;
    id: string;
    installation_date: string | null;
    name: string;
    route_name: string | null;
    type: ILocationType;
    zseu_count: number;
    expired_status_id: IExpiredStatusId;
};

export type IExpiredStatusId = 0 | 1 | 2 | null;

export type ILocationType = "USE" | "ZSEU";

export type IIcon = {
    expiredStatusId: IExpiredStatusId | null;
    locationType: ILocationType;
    markerSize: number;
}