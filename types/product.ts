import type { IBadge, IBreadCrumb } from ".";

export type IProductItem = {
    name: string;
    shortDesc: string;
    slug: string;
    imageUrl: string;
    badge: IBadge | null;
}

export type IProduct = {
    similiarProducts: ISimiliarProduct[];
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

type ISimiliarProduct = {
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
}

type IFile = {
    label: string;
    url: string;
}
type IPhoto = {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    thumb?: string;
    full?: string;
}