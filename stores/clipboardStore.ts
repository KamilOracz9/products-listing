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
        hasItems: (state) => (!isEmpty(state.items)),
    },
    actions: {
        getIds() {
            return JSON.parse(localStorage.getItem('clipboard-ids') as string);
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
            if (isEmpty(this.getIds())) this.items = [];
            else this.items = await fetchClipboardItems(this.getIds());
        },
    },
});

export default useClipboardStore;