import type { IPhoto } from ".";

export type ICollectionItem = {
    name: string;
    slug: string;
    images: IPhoto;
}