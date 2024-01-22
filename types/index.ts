// Header
export type IHeaderMenu = {
    isLoading: boolean;
    items: IHeaderMenuItem[];
    categories: IHeaderMenuCategory[];
};

export type IHeaderMenuItem = {
    label: string;
    slug: string;
    type: null | 'products' | 'search' | 'download' | 'clipboard';
    items: IHeaderMenuSubItem[];
};

export type IHeaderMenuSubItem = {
    label: string;
    slug: string;
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

// Clipboard
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

//Footer
export type IFooterItemLink = {
    label: string;
    slug: string;
    url: string;
}

export type IFooterItem = {
    label: string;
    slug: string;
    items: IFooterItemLink[],
}

export type IFooterContact = {
    label: string;
    phones: string[];
    addresses: string[];
    emails: string[];
}

export type IFooterWebsite = {
    label: string;
    url: string;
}

export type IFooterData = {
    items: IFooterItem[];
    contacts: IFooterContact[];
    websites: IFooterWebsite[];
}

// Locales
export type IActiveLocale = {
    label: string;
    code: string
    flagUrl: string;
}