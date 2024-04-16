import type { DescriptionType, Page } from "./common.types";

export interface FormOnlinePage extends Page {
    "description": {
        "type": DescriptionType;
        "content": {
            "section_1": {
                "title": string;
                "html": string;
            },
            "section_2": {
                "hmtl": string;
            },
            "section_3": {
                "checkbox_1": string;
                "checkbox_2": string;
                "button": string;
            }
        }
    }
}