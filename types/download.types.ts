import type { Colors } from "~/enums/download";
import type { DescriptionType, Page } from "./common.types";

export interface DownloadPage extends Page {
    "description": {
        "type": DescriptionType
        "content": {
            [name: string]: Section;
        }
    }
}

export type Section = {
    "title": string;
    "items": Item[];
    "button"?: string;
    "link"?: string;
    "Group_0"?: {
        "items": Item[];
    },
    "Group_1"?: {
        "items": Item[];
    },
    "Group_2"?: {
        "items": Item[];
    },
}

export type Item = {
    "text": string;
    "link": string;
    "image": string;
    "color": Colors;
}