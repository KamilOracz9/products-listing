import type { ICategoriesList, ICategory } from "~/types/category";
import concat from 'lodash/concat';

type ICategoryStore = {
    list: {
        isLoading: boolean;
        items: ICategoriesList;
    };
}

const useCategoryStore = defineStore('category', {
    state: (): ICategoryStore => ({
        list: {
            isLoading: false,
            items: { columns: [{ items: [] }] },
        },
    }),
    getters: {
        mainCategories: state => {
            const categories = state.list.items.columns
                .map((column: { items: ICategory[] }) => column.items
                    .map(({ label, url, slug, iconUrl, productsCount, enableOnFilters }) => ({ label, url, slug, iconUrl, productsCount, enableOnFilters }))
                )

            return concat(...categories);
        },
    },
    actions: {
        async fetchCategories(): Promise<void> {
            this.list.isLoading = true;

            await import('@/data/categories').then(response => {
                this.list.items = <ICategoriesList>response.default;
            }).finally(() => this.list.isLoading = false)
        }
    },
})

export default useCategoryStore;