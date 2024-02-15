import type { IBadge, IBreadCrumb, IPhoto } from ".";

export type IProductItem = {
    name: string;
    shortDesc: string;
    slug: string;
    imageUrl: string;
    badge: IBadge | null;
}

export type IProduct = {
    similarProducts: IsimilarProduct[];
    breadcrumbs: IBreadCrumb[];
    badge: IBadge | null;
    images: {
        main: IPhoto;
        gallery?: IPhoto[];
        attachments: IPhoto[];
        glasses: IPhoto[];
        tech: IPhoto[];
        doorOpens: IPhoto[];
    };
    name: string;
    category: {
        name: string;
    };
    description: string;
    glassDescription: string;
    variants: IVariant[];
    files: IFile[];
    colors: IColor[];
    descriptionIcons: IDescriptionIcon[];
}

type IsimilarProduct = {
    image: string;
    name: string;
    slug: string;
}

type IDescriptionIcon = {
    description: string;
    icon: string;
}

type IColor = {
    path: string;
    image: string;
}

type IVariant = {
    symbol: string;
    w: number;
    h: number;
    a: string;
    c: number;
    b: string;
    x1: string;
    x2: string;
    doors: {
        number: number;
        direction: string;
    },
    id: number;
    dimensions: string;
    realizationTime?: number;
}

type IFile = {
    label: string;
    url: string;
}
