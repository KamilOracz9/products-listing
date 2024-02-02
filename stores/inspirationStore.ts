import type { IBreadCrumb } from "~/types";
import type { IInspirationCategory, IInspirationsFaq } from "~/types/inspirations";

type IInspirationStore = {
    listing: {
        isLoading: boolean;
        header: {
            title: string;
            body: string;
        },
        breadcrumbs: IBreadCrumb[] | null;
        categories: IInspirationCategory[];
        faq: IInspirationsFaq[];
    },
    category: {
        isLoading: boolean;
        item: IInspirationCategory | null;
    }
}

const useInspirationStore = defineStore('inspiration', {
    state: (): IInspirationStore => ({
        listing: {
            isLoading: false,
            header: {
                title: '',
                body: '',
            },
            breadcrumbs: null,
            categories: [],
            faq: [],
        },
        category: {
            isLoading: true,
            item: null,
        }
    }),
    actions: {
        async fetchListingData() {
            this.listing.isLoading = true;

            await import('@/data/inspirations')
                .then(response => {
                    this.listing.header = response.default.header;
                    this.listing.breadcrumbs = <IBreadCrumb[]>response.default.breadcrumbs;
                    this.listing.categories = <IInspirationCategory[]>response.default.categories;
                    this.listing.faq = <IInspirationsFaq[]>response.default.faq;
                })
                .finally(() => this.listing.isLoading = false);
        },
        async fetchCategory() {
            this.category.isLoading = true;

            await import('@/data/inspirations')
                .then(response => {
                    this.category.item = response.default.category;
                })
                .finally(() => this.category.isLoading = false);
        },
    }
})

export default useInspirationStore;