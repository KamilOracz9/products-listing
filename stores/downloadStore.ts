import type { IBreadCrumb } from "~/types";
import type { IDownloadSection } from "~/types/download";

type IDownloadStore = {
    breadcrumbs: IBreadCrumb[];
    isLoading: boolean;
    sections: IDownloadSection[] | null;
}

const useDownloadStore = defineStore('download', {
    state: (): IDownloadStore => ({
        breadcrumbs: [],
        isLoading: true,
        sections: null,
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/download')
                .then(response => (response.default))
                .then(data => {
                    this.breadcrumbs = data.breadcrumbs;
                    this.sections = data.sections;
                })
                .finally(() => this.isLoading = false)
        },
    }
})

export default useDownloadStore;