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