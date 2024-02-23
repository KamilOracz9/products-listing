import type { IBreadCrumb, IPhoto } from "~/types";
import type { ICollectionItem } from "~/types/collection";

type ICollectionStore = {
    isLoading: boolean;
    breadcrumbs: IBreadCrumb[];
    items: ICollectionItem[] | null;
}

const useCollectionStore = defineStore('collection', {
    state: (): ICollectionStore => ({
        isLoading: true,
        breadcrumbs: [],
        items: null,
    }),
    actions: {
        async fetchCollections() {
            this.isLoading = true;

            const { data } = await useFetch(`${useAppConfig().public.apiBase}/pl_PL/collections`)
                .finally(() => this.isLoading = false);

            this.items = <ICollectionItem[]>data.value.data;
        },
    }
})

export default useCollectionStore;