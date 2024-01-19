import type { IFooterContact, IFooterItem, IFooterWebsite } from "~/types";

type IFooterStore = {
    activeItem: string;
    data: {
        isLoading: boolean;
        items: IFooterItem[];
        contacts: IFooterContact[];
        websites: IFooterWebsite[];
    };
}

export const useFooterStore = defineStore('footer', {
    state: (): IFooterStore => ({
        activeItem: '',
        data: {
            isLoading: false,
            items: [],
            contacts: [],
            websites: [],
        }
    }),
    actions: {
        async fetchData() {
            this.data.isLoading = true;

            await import('@/data/footer').then(response => {
                this.data.items = response.default.items;
                this.data.contacts = response.default.contacts;
                this.data.websites = response.default.websites;
            }).finally(() => this.data.isLoading = false);
        },
        setActiveItem(slug: string) {
            this.activeItem = this.activeItem === slug ? '' :  slug;
        },
        isActive(slug: string) {
            return this.activeItem === slug;
        },
    }
})