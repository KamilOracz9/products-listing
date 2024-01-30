export type IProductItem = {
    name: string;
    shortDesc: string;
    slug: string;
    imageUrl: string;
    badge: {
        label: string;
        color: string;
        bgColor: string;
    } | null;
}