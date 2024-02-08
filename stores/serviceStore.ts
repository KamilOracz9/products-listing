import type { IBreadCrumb } from "~/types";
import type { IServiceSections } from "~/types/service";

type IServiceStore = {
    isLoading: boolean;
    breadcrumbs: IBreadCrumb[];
    title: string;
    sections: IServiceSections | null;
}

const useServiceStore = defineStore('service', {
    state: (): IServiceStore => ({
        isLoading: true,
        breadcrumbs: [],
        title: '',
        sections: null,
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/service')
                .then(response => {
                    this.breadcrumbs = response.default.breadcrumbs;
                    this.title = response.default.title;
                    this.sections = response.default.sections;
                })
                .finally(() => this.isLoading = false)
        },

        async fetchCities() {
            await import('@/data/service')
                .then(response => {
                    if(this.sections) this.sections.section5.cities = response.cities;
                })
        },
    }
})

export default useServiceStore;