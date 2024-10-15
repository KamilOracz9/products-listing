export type Layout = {
    "header": Header;
    "footer": Footer;
    "socials": Socials;
}

export type Socials = {
    "facebook"?: string;
    "instagram"?: string;
    "pinterest"?: string;
    "youtube"?: string;
    "linkedin"?: string;
}

export type Header = {
    "name": string;
    "path": string;
    "hash"?: string | null;
    "query"?: string | null;
    "columns"?: LayoutItem[][];
    "items"?: LayoutItem[] | null;
}[];

export type Footer = {
    "top": FooterTop;
    "bottom": FooterBottom;
}

export type FooterTop = {
    "name": string;
    "path": string;
    "hash"?: string | null;
    "query"?: string | null;
    "items"?: LayoutItem[] | null;
}[];

export type LayoutItem = {
    "name": string;
    "image"?: string | null;
    "path": string;
    "hash"?: string | null;
    "query"?: string | null;
    "items"?: LayoutItem[] | null;
}

export type FooterBottom = {
    "company": {
        "title": string;
        "address": string;
        "email": string;
    };
    "departments": {
        "title": string;
        "phone": string[];
        "email": string[];
    }[];
    "our_websites": {
        "title": string;
        "items": string[] | null;
    };
}

export type Category = {
    "id": number;
    "name": string;
    "slug": string;
    "tree_level": number;
    "parent_id": number;
    "main_parent_id": number;
    "order_column": number;
    "menu_column": null;
    "image": null;
    "children": Category[];
}

export type Collection = {
    "name": string;
    "slug": string;
}

export type MenuSubItem = {
    "path": string;
    "label": string;
}

export type MenuItem = {
    "title": string;
    "items": MenuSubItem[];
}

export type FooterDepartment = {
    "title": string;
    "phone": string[];
    "email": string[];
    "address": string[];
}

export type FooterCompany = {
    "title": string;
    "address": string;
    "email": string;
}