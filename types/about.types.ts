import type { DescriptionType, Image, Page } from "./common.types";

export interface AboutPage extends Page {
    description: {
        type: DescriptionType;
        content: {
            'section_1': {
                html: string;
                timeline: {
                    date: string;
                    text: string;
                }[];
                images: Image[];
            };
            'section_2': {
                html: string;
                title: string;
                images: Image[];
            };
            'section_3': {
                html: string;
                title: string;
            };
            'section_4': {
                title: string;
                column_left: { html: string; };
                column_right: { html: string; };
                images: Image[];
            };
        };
    }
}