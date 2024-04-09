export type Breadcrumbs = Breadcrumb[];

type Breadcrumb = {
    label: string;
    path: string;
}


export type Locale = string;

export type Meta = {
    canonical_tag?: string | null;
    meta_description?: string;
    meta_keywords?: string;
    meta_title?: string;
    nofollow?: boolean;
    noindex?: boolean;
}

export interface Page {
    "locale": Locale;
    "breadcrumbs": Breadcrumbs;
    "meta": Meta;
    "title": string;
    "slug": string,
}

export type DescriptionType = 'simple' | 'extended';

export type Description = {
    type: DescriptionType;
    content: {
        html: string;
    }
}

export type Image = {
    "mobile": string;
    "tablet": string;
    "desktop": string;
}

export type SocialLink = {
    "type": string;
    "url": string;
}
