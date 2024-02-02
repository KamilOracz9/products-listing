export type IInspirationCategory = {
    title: string;
    slug: string;
    articles: IInspirationArticle[];
}

export type IInspirationsFaq = {
    question: string;
    answer: string;
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