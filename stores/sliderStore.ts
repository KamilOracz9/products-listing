import type { IMainSliderSlide } from "~/types";

type ISliderStore = {
    main: {
        isLoading: boolean;
        items: IMainSliderSlide[];
    }
}

const useSliderStore = defineStore('slider', {
    state: (): ISliderStore => ({
        main: {
            isLoading: false,
            items: [],
        }
    }),
    actions: {
        async fetchMainSliderSlides () {
            this.main.isLoading = true;

            await import('@/data/mainSlider')
                .then(response => this.main.items = <IMainSliderSlide[]>response.default)
                .finally(() => this.main.isLoading = false)
        }
    }
})

export default useSliderStore;