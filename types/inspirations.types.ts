import type { IPhoto } from ".";
import type { DescriptionType, Faq, Image, Page, Pagination, SocialLink } from "./common.types";

export interface InspirationPage extends Page {
    "description_short": String;
    "image": Image;
    "socials": SocialLink[];
    "description": String;
    "gallery": Image[],
    "related": Inspiration[];
}

export type Inspiration = {
    "title": String;
    "slug": String;
    "description_short": String;
    "image": Image;
    "socials": SocialLink[];
}

export interface InspirationCategoriesPage extends Page {
    "description": {
        type: DescriptionType;
        content: {
            intro: string;
            categories: Category[];
            faq: Faq;
        }
    }
}

export type Article = {
    "title": number;
    "slug": number;
    "description_short": number;
    "more"?: number;
    "image": IPhoto;
    "socials"?: Social[];
}

export type Category = {
    "id": number;
    "position": number;
    "name": number;
    "slug": number;
    "more": number;
    "articles": Article[];
}

export interface InspirationCategoryPage extends Page {

    "pagination": Pagination;
    "items": Article[];
}

export type Social = {
    type: string;
    url: string;
}
