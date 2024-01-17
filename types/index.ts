export type IMobileHeaderMenu = {
    isLoading: boolean;
    items: IMobileHeaderMenuItem[];
};

export type IMobileHeaderMenuItem = {
    label: string;
    slug: string;
    url: string;
    iconUrl: string;
    items: IMobileHeaderMenuSubItem[];
};

export type IMobileHeaderMenuSubItem = {
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