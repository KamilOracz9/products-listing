import type { IBreadCrumb } from "~/types";
import type { IInspirationCategory, IInspirationFullArticle, IInspirationsFaq } from "~/types/inspirations";

type IInspirationStore = {
    listing: {
        isLoading: boolean;
        header: {
            body: string;
        },
        breadcrumbs: IBreadCrumb[] | null;
        categories: IInspirationCategory[];
        faq: IInspirationsFaq[];
    },
    category: {
        isLoading: boolean;
        item: IInspirationCategory | null;
    },
    article: {
        isLoading: boolean;
        item: IInspirationFullArticle | null;
    },
}

const useInspirationStore = defineStore('inspiration', {
    state: (): IInspirationStore => ({
        listing: {
            isLoading: false,
            header: {
                body: '',
            },
            breadcrumbs: null,
            categories: [],
            faq: [],
        },
        category: {
            isLoading: true,
            item: null,
        },
        article: {
            isLoading: true,
            item: null,
        },
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

            const { data } = await useFetch(`${useAppConfig().public.apiBase}/v1/pl_PL/articles/category/aktualnosci`)
                .finally(() => this.category.isLoading = false);

            this.category.item = <IInspirationCategory>data.value;
        },
        async fetchArticle(slug: string) {
            this.article.isLoading = true;

            const { data } = await useFetch(`${useAppConfig().public.apiBase}/v1/pl_PL/articles/show/${slug}`)
                .finally(() => this.article.isLoading = false);

            this.article.item = <IInspirationFullArticle>data.value;
        },
    }
})

export default useInspirationStore;