import type { IPhoto } from ".";
import type { Page } from "./common.types";

export interface ProductPage extends Page {
    "name": string;
    "description": string;
    "category": Category;
    "badge": [];
    "variants": Variant[];
    "images": {
        "main": IPhoto;
        "details": IPhoto[];
        "glasses": IPhoto[];
        "technical": IPhoto[];
        "technical_desc": [];
        "doors_open": IPhoto[];
        "attribute_icons": {
            image: IPhoto;
            label: string;
        }[];
        "description_icons": IPhoto[];
    },
    "files": Files;
    "similarProducts": []
}

export type Files = {
    [key: string]: File;
}

export type File = {
    "label": string;
    "value": string;
}

export type Variant = {
    "symbol": string;
    "width": number;
    "height": number;
    "length"?: number;
    "dimensions": string;
    "id": number;
    "order_time_id": number;
    "group"? : {
        id: number;
        name: string;
    },
    parts_catalog: {
        bom_uuid: string;
        code: string;
        mar_uuid: string;
        media: string;
        name: string;
    }[];
}

export type Category = {
    "name": string;
    "slug": string;
}

export type ProductPageParams = {
    slug: string;
}