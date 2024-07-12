import type { Page } from "./common.types";

export interface CategoryPage extends Page {
    description: string;
    description_short: string;
    categories: {
        id: number;
        slug: string;
        name: string;
        image: string;
    }
}