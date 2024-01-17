import type { IClipboardItem } from "~/types";

type IClipboardStore = {
    items: {
        isLoading: boolean;
        products: IClipboardItem[];
    };
}

export const useClipboardStore = defineStore('clipboard', {
    state: (): IClipboardStore => ({
        items: {
            isLoading: false,
            products: [],
        },
    }),
    actions: {
        async fetchItems(): Promise<void> {
            this.items.isLoading = true;

            await import('@/data/clipboard').then(response => {
                this.items.products = <IClipboardItem[]>response.default;
            }).finally(() => this.items.isLoading = false)
        }
    },
});