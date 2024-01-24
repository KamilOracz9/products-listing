import type { IHomeAboutTile, IHomeCategoryItem, IHomeInOfferCollection, IHomeInOfferColor, IHomeProductTile, IMainSliderSlide } from "~/types";

type IHomeStore = {
    isLoading: boolean;
    slider: {
        items: IMainSliderSlide[];
    };
    categories: {
        items: IHomeCategoryItem[],
    },
    productTiles: {
        items: IHomeProductTile[],
    },
    aboutTiles: {
        items: IHomeAboutTile[],
    },
    inOffer: {
        colors: IHomeInOfferColor[];
        collections: IHomeInOfferCollection[];
    }
}

const useHomeStore = defineStore('slider', {
    state: (): IHomeStore => ({
        isLoading: false,
        slider: { items: [] },
        categories: { items: [] },
        productTiles: { items: [] },
        aboutTiles: { items: [] },
        inOffer: { colors: [], collections: [] },
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/home')
                .then(response => {
                    this.slider.items = <IMainSliderSlide[]>response.default.slider.items;
                    this.categories.items = <IHomeCategoryItem[]>response.default.categories.items;
                    this.productTiles.items = <IHomeProductTile[]>response.default.productTiles.items;
                    this.aboutTiles.items = <IHomeAboutTile[]>response.default.aboutTiles.items;
                    this.inOffer.colors = <IHomeInOfferColor[]>response.default.inOffer.colors;
                    this.inOffer.collections = <IHomeInOfferCollection[]>response.default.inOffer.collections;
                })
                .finally(() => this.isLoading = false)
        }
    }
})

export default useHomeStore;