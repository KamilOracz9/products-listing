import type { DescriptionType, Page } from "./common.types"

export interface ServicePage extends Page {
    "description": {
        "type": DescriptionType
        "content": {
            "section_1": Section1;
            "section_2": Section2;
            "section_3": Section3;
            "section_4": Section4;
            "section_5": Section5;
        }
    }
}

export type Installer = {
    "name": string;
    "items": {
        "name": string;
        "phone": string;
    }[];
}

export type ContactItem = {
    "title": string;
    "phone": string;
    "hours": string;
}

export type Section1 = {
    "text": string;
    "items": ContactItem[];
}

export type Section2 = {
    "title": string;
    "text": string;
    "text_image": string;
    "image": string;
}

export type Section3 = {
    "title": string;
    "text": string;
    "installer_options": {
        [id: string]: string;
    };
    "installers": Installer[];
}

export type Section4 = {
    "title": string;
    "text": string;
    "button": string;
    "button_path": string;
}

export type Section5 = {
    "title": string;
    "text": string;
    "button_1": string;
    "button_2": string;
}