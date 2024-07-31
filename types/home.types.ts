import type { IPhoto } from ".";
import type { Page } from "./common.types";

export interface HomePage extends Page {
    "description": {
        "type": "extended",
        "content": {
            "sliders": Slide[];
            "categories": Category[];
            "collections": Collection[];
            "box": Box[];
            "customized": Customized,
            "quality": {
                "image": string;
                "html": string;
            },
            "products": {
                "html": string;
            },
            "information": {
                "html": string;
            },
            "yellow": {
                "html": string;
            },
            "welcome": {
                "html": string;
            }
        }
    }
}

export type Slide = {
    "image"?: IPhoto;
    "title": string;
    "subtitle": string;
    "tab": string;
    "path": string;
    video?: {
        full: string;
    };
}

export type Category = {
    "name": "DRZWI WNĘKOWE",
    "path": "/kategorie/drzwi-wnekowe"
}

export type Collection = {
    "image": IPhoto,
    "title": string;
    "subtitle": string;
    "path": string;
}

export type Box = {
    "icon": string;
    "subtitle": string;
    "title": string;
    "description": string;
    "more_text": string;
    "path": string;
}
export type Customized = {
    "title": string;
    "subtitle": string;
    "text": string;
    "more_text": string;
    "path": string;
    "image": IPhoto;
}