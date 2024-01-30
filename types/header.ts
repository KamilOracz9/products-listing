import type { ICategoriesList } from "./category";

export type IHeaderMenuItem = {
    label: string;
    slug: string;
    type: null | 'products' | 'search' | 'download' | 'clipboard';
    items?: IHeaderMenuSubItem[] | ICategoriesList;
};

export type IHeaderMenuSubItem = {
    label: string;
    slug: string;
};