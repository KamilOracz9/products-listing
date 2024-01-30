import type { IBreadCrumb } from ".";

export type ICategoriesList = {
    columns: {
        items: ICategory[];
    }[]
}

export type ICategory = {
    label: string;
    slug: string;
    url: string;
    iconUrl: string;
    items: ISubcategory[];
    breadcrumbs: IBreadCrumb[] | null;
    productsCount: number,
    enableOnFilters: boolean,
};

export type ISubcategory = {
    label: string;
    url: string;
    slug: string;
    items?: [];
};