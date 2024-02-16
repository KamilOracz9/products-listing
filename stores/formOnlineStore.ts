import type { IBreadCrumb } from "~/types";

type IFormnlineStore = {
    breadcrumbs: IBreadCrumb[];
    isLoading: boolean;
    text: string;
    clausue: string;
}

const useFormOnlineStore = defineStore('fomrOnline', {
    state: (): IFormnlineStore => ({
        isLoading: true,
        breadcrumbs: [],
        text: '',
        clausue: '',
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/formOnline').then(response => {
                this.breadcrumbs = response.default.breadcrumbs;
                this.text = response.default.text;
                this.clausue = response.default.clausue;
            }).finally(() => this.isLoading = false);
        },
    }
});

export default useFormOnlineStore;