export type IMainSliderSlide = {
    title: string | null;
    subtitle: string | null;
    url: string;
    type: 'image' | 'video';
    fileUrls: {
        base: string;
        sm?: string;
        lg?: string;
    };
    navTitle: string;
}

export type IHomeCategoryItem = {
    label: string;
    slug: string;
}

export type IHomeProductTile = {
    title: string;
    subtitle: string;
    productSlug: string;
    imageUrl: string;
}

export type IHomeAboutTile = {
    title: string;
    subtitle?: string;
    description: string;
    imageUrl: string;
    url: string;
}

export type IHomeInOfferColor = {
    title: string;
    url: string;
}

export type IHomeInOfferCollection = {
    title: string;
    url: string;
    categories?: IHomeInOfferCollectionCategory[];
}

export type IHomeInOfferCollectionCategory = {
    title: string;
    url: string;
}

export type IHomeAdditionalContentItem = {
    title?: string;
    url?: string;
    content?: string;
    list?: { title: string; }[]
}