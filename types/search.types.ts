import type { IPhoto } from "."

export type Results = {
    "products": Product[];
    "articles": Article[];
}

export type Article = {
    "title": string;
    "slug": string;
    "description_short": string;
    "more": string;
    "image": IPhoto;
}

export type Product = {
    "id": number;
    "brand_id": number;
    "series_id": number;
    "collection_id": number;
    "type_id": number;
    "category_id": number;
    "name": string;
    "slug": string;
    "description_short": string;
    "media": {
        "main": {
            "original": string;
            "1024_1365": string;
            "460_613": string;
        }
    },
    "badge"?: []
}

export type HeaderSearchRequest = {
    search: string;
    searchInProducts: number;
    searchInInspirations: number;
}