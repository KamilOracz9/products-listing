import type { Image, Page, SocialLink } from "./common.types";

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