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
}

export type Category = {
    "name": string;
    "slug": string;
}

export type ProductPageParams = {
    slug: string;
}