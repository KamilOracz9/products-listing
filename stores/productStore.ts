import type { IProductItem } from "~/types/product";

type IProductStore = {
    list: {
        isLoading: boolean;
        items: IProductItem[];
    }
}

const useProductStore = defineStore('product', {
    state: (): IProductStore => ({
        list: {
            isLoading: true,
            items: [],
        }
    }),
    actions: {
        async fetchProducts() {
            this.list.isLoading = true;

            await import('@/data/products')
                .then(response => {
                    this.list.items = <IProductItem[]>response.default;
                })
                .finally(() => this.list.isLoading = false)
        },
    }
})

export default useProductStore;