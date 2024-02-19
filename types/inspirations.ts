import type { IBreadCrumb, IPhoto } from ".";

export type IInspirationCategory = {
    title: string;
    slug: string;
    breadcrumbs: IBreadCrumb[] | null;
    items: IInspirationArticle[];
}

export type IInspirationsFaq = {
    question: string;
    answer: string;
}

export type IInspirationFullArticle = {
    breadcrumbs: IBreadCrumb[];
    image: IPhoto;
    gallery: IPhoto[];
    socials: {
        type: string;
        url: string;
    }[];
    title: string;
    text: string;
    slug: string;
    related: IInspirationArticle[];
}

export type IInspirationArticle = {
    image: IPhoto;
    socials: {
        type: string;
        url: string;
    }[];
    title: string;
    shortText: string;
    slug: string;
}