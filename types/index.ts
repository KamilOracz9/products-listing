// Locales
export type IActiveLocale = {
    label: string;
    code: string
}

// Breadcrumbs
export type IBreadCrumb = {
    label: string;
    path: string;
}

// Badges
export type IBadge = {
    label: string;
    color: string;
    bgColor: string;
}

// Photos
export type IPhoto = {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    thumb?: string;
    full?: string;
    thumbnail?: string;
}