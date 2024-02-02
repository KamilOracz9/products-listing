import type { IBreadCrumb, IPhoto } from ".";

export type IInspirationCategory = {
    title: string;
    slug: string;
    breadcrumbs: IBreadCrumb[] | null;
    articles: IInspirationArticle[];
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
    similar: IInspirationArticle[];
}

type IInspirationArticle = {
    image: string;
    socials: {
        type: string;
        url: string;
    }[];
    title: string;
    shortText: string;
    slug: string;
}