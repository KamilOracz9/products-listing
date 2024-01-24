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

// Home
export type IMainSliderSlide = {
    title: string | null;
    subtitle: string | null;
    url: string;
    type: 'image' | 'video';
    fileUrls: {
        base: string;
        sm?: string;
        lg?: string;
    };
    navTitle: string;
}

export type IHomeCategoryItem = {
    label: string;
    slug: string;
}

export type IHomeProductTile = {
    title: string;
    subtitle: string;
    productSlug: string;
    imageUrl: string;
}

export type IHomeAboutTile = {
    title: string;
    subtitle?: string;
    description: string;
    imageUrl: string;
    url: string;
}

export type IHomeInOfferColor = {
    title: string;
    url: string;
}

export type IHomeInOfferCollection = {
    title: string;
    url: string;
    categories?: IHomeInOfferCollectionCategory[];
}

export type IHomeInOfferCollectionCategory = {
    title: string;
    url: string;
}