import type { IHomeCategoryItem, IHomeProductTile, IMainSliderSlide } from "~/types";

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
    }
}

const useHomeStore = defineStore('slider', {
    state: (): IHomeStore => ({
        isLoading: false,
        slider: { items: [] },
        categories: { items: [] },
        productTiles: { items: [] },
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/home')
                .then(response => {
                    this.slider.items = <IMainSliderSlide[]>response.default.slider.items;
                    this.categories.items = <IHomeCategoryItem[]>response.default.categories.items;
                    this.productTiles.items = <IHomeProductTile[]>response.default.productTiles.items;
                })
                .finally(() => this.isLoading = false)
        }
    }
})

export default useHomeStore;