import type { IBreadCrumb } from "~/types";
import type { IForProfessionalsArchitectZone, IForProfessionalsPartnerZone } from "~/types/for-professionals";

type IForProfessionalStore = {
    isLoading: boolean;
    breadcrumbs: IBreadCrumb[];
    partnerZone: IForProfessionalsPartnerZone | null;
    architectZone: IForProfessionalsArchitectZone | null;
}

const useForProfessionalStore = defineStore('forProfessionals', {
    state: (): IForProfessionalStore => ({
        isLoading: true,
        breadcrumbs: [],
        partnerZone: null,
        architectZone: null,
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/for-professionals')
                .then(response => (response.default))
                .then(data => {
                    this.breadcrumbs = data.breadcrumbs;
                    this.partnerZone = data.partnerZone;
                    this.architectZone = data.architectZone;
                })
                .finally(() => this.isLoading = false)
        },
    }
})

export default useForProfessionalStore;