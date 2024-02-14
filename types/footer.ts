export type IFooterItemLink = {
    label?: string;
    slug: string;
}

export type IFooterItem = {
    slug: string;
    label?: string;
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