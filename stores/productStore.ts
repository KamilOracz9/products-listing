import type { IProduct, IProductItem } from "~/types/product";

type IProductStore = {
    list: {
        isLoading: boolean;
        items: IProductItem[];
    }
    product: {
        isLoading: boolean;
        item: IProduct | null;
    };
}

const useProductStore = defineStore('product', {
    state: (): IProductStore => ({
        list: {
            isLoading: true,
            items: [],
        },
        product: {
            isLoading: true,
            item: null,
        },
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
        async fetchProduct() {
            this.product.isLoading = true;

            await import('@/data/product')
                .then(response => {
                    this.product.item = <IProduct>response.default;
                })
                .finally(() => this.product.isLoading = false)
        }
    }
})

export default useProductStore;