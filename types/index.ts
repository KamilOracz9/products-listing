export type IHeaderMenu = {
    isLoading: boolean;
    items: IHeaderMenuItem[];
    categories: IHeaderMenuCategory[];
};

export type IHeaderMenuItem = {
    label: string;
    slug: string;
    url: string;
    iconUrl: string;
    type: null | 'products' | 'search' | 'download' | 'clipboard';
    items: IHeaderMenuSubItem[];
};

export type IHeaderMenuSubItem = {
    label: string;
    url: string;
    iconUrl: string;
};

export type IClipboardItem = {
    name: string;
    slug: string;
    url: string;
    path: string;
    symbol: string;
    dimensions: string;
    price: string;
    imgUrl: string;
};

export type IHeaderMenuCategory = {
    label: string;
    slug: string;
    url: string;
    iconUrl: string;
    items: IHeaderMenuSubcategory[];
};

export type IHeaderMenuSubcategory = {
    label: string;
    url: string;
    slug: string;
};