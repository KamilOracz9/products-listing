import type { DescriptionType, Page } from "./common.types";

export interface InformationClausuePage extends Page {
    description: {
        type: DescriptionType;
        content: {
            html: string;
        }
    }
}