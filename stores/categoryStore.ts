import type { ICategoriesList, ICategory } from "~/types/category";
import concat from 'lodash/concat';
import type { IBreadCrumb } from "~/types";

type ICategoryStore = {
    list: {
        isLoading: boolean;
        items: ICategoriesList;
    };
    breadcrumbs: IBreadCrumb[] | null;
}

const useCategoryStore = defineStore('category', {
    state: (): ICategoryStore => ({
        list: {
            isLoading: true,
            items: { columns: [{ items: [] }] },
        },
        breadcrumbs: null,
    }),
    getters: {
        mainCategories: state => {
            const categories = state.list.items.columns
                .map((column: { items: ICategory[] }) => column.items
                    .map(({ label, url, slug, iconUrl, productsCount, enableOnFilters, breadcrumbs }) => ({ label, url, slug, iconUrl, productsCount, enableOnFilters, breadcrumbs }))
                )

            return concat(...categories);
        },
    },
    actions: {
        async fetchCategories(): Promise<void> {
            this.list.isLoading = true;

            await import('@/data/categories').then(response => {
                this.list.items = <ICategoriesList>response.default;
                this.breadcrumbs = <IBreadCrumb[]>response.default.breadcrumbs
            }).finally(() => this.list.isLoading = false)
        }
    },
})

export default useCategoryStore;