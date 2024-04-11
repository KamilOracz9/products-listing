import type { DescriptionType, Page } from "./common.types";

export interface MadeToMeasurePage extends Page {
    "description": {
        "type": DescriptionType;
        "content": {
            "section_1": {
                "title": string;
                "html": {
                    "top": string;
                    "bottom": string;
                };
                "images": {
                    "svg": string;
                    "right": string;
                };
                "buttons": {
                    "button": string;
                    "link": string;
                }[];
            },
            "section_2": {
                "title": string;
                "subtitle": string;
                "items": {
                    "icon": string;
                    "title": string;
                    "html": string;
                }[];
            };
            "section_3": {
                "title": string;
                "items": {
                    "hashtag": string;
                    "label": string;
                }[];
            };
            "section_4": BaseSection;
            "section_5": Section5;
            "section_6": BaseSection;
            "section_7": BaseSection;
            "section_8": BaseSection;
            "section_9": BaseSection;
            "section_10": Section10;
        }
    }
}

export type TableRecord = {
    "symbol": string;
    "glass": string;
}

export type BaseSection = {
    "hashtag": string;
    "title": string;
    "html": string;
    "button": string;
    "link": string;
    "image"?: string;
};

export type Section5 = BaseSection & {
    "images": [
        {
            "left": string;
            "right": string;
            "bottom": string[];
        }
    ];
};

export type Section10 = BaseSection & {
    "items": [
        {
            "name": string;
            "image": string;
            "level_transparency": string;
            "level_discretion": string;
            "table": [
                {
                    "thead": TableRecord[];
                    "tbody": TableRecord[];
                }
            ],
            "text": string;
        },
    ]
}