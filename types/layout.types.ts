export type Layout = {
    "header": Header;
    "footer": Footer;
    "socials": Socials;
}

export type Socials = {
    "facebook": string;
    "instagram": string;
    "pinterest": string;
    "youtube": string;
    "linkedin": string;
}

export type Header = {
    "products": {
        "title": string;
        "items": {
            "made-to-measure": {
                "name": string;
                "image": string;
                "menu_column": number;
                "items": {
                    "name": string;
                    "path": string;
                }[];
            };
            "categories": Category[];
            "collections": {
                "image": string;
                "menu_column": number;
                "items": Collection[];
            }
        }
    };
    "inspirations": MenuItem;
    "for-professionals": MenuItem;
    "about-us": MenuItem;
    "contact": MenuItem;
    "place-to-buy": MenuItem;
}

export type Footer = {
    "top": FooterTop;
    "bottom": FooterBottom;
}

export type FooterTop = {
    "products": MenuItem;
    "inspirations": MenuItem;
    "for-professionals": MenuItem;
    "about-us": MenuItem;
    "contact": MenuItem;
}

export type FooterBottom = {
    "company": FooterCompany;
    "departments": FooterDepartment[];
    "our_websites": {
        "title": string;
        "items": string[];
    }
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