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
    productsCount: number,
    enableOnFilters: boolean,
};

export type ISubcategory = {
    label: string;
    url: string;
    slug: string;
    items?: [];
};