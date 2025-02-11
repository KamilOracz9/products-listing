import { fetchClipboardItems } from "~/services/api/clipboard";
import type { ClipboardItem } from "~/types/clipboard.types";

type IClipboardStore = {
    items: ClipboardItem[];
}

const useClipboardStore = defineStore('clipboard', {
    state: (): IClipboardStore => ({
        items: [],
    }),
    getters: {
        hasItems: (state) => (state.items.length),
    },
    actions: {
        getIds() {
            if (localStorage.getItem('clipboard-ids')) return JSON.parse(localStorage.getItem('clipboard-ids') as string);
            else return [];
        },
        async toggleItem(variantId: number) {
            let ids = this.getIds() ?? [];
            const exisits = !!ids.find((id: number) => id == variantId);

            if (!exisits) ids.push(variantId);
            else ids = ids.filter((id: number) => id != variantId);

            localStorage.setItem('clipboard-ids', JSON.stringify(ids));

            await this.fetchItems();
        },
        async fetchItems() {
            if (!this.getIds() || !this.getIds().length) this.items = [];
            else this.items = await fetchClipboardItems(this.getIds()) as [];
        },
        hasItem(variantId: number) {
            return !!this.items.find(item => item.variant_id === toValue(variantId))
        },
        async clear() {
            this.items = [];
            localStorage.setItem('clipboard-ids', '');
        },
    },
});

export default useClipboardStore;