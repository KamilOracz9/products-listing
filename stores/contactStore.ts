import type { IBreadCrumb, IPhoto } from "~/types";
import type { IContactEmployee } from "~/types/contact";

type IContactStore = {
    isLoading: boolean;
    breadcrumbs: IBreadCrumb[];
    main: {
        title: string;
        contact: {
            address: string;
            phone: string;
            email: string;
            gps: string;
            map: {
                image: string;
                url: string;
            };
        };
        numbers: {
            nip: string;
            krs: string;
            regon: string;
        };
        image: IPhoto;
        logisticCentrum: {
            address: string;
        }
    } | null;
    tiles: {
        icon: string;
        title: string;
        phones: string[];
        emails: string[];
    }[] | null;
    saleServiceDepartment: {
        text: string;
        options: {
            value: string;
            label: string;
        }[];
        employees: IContactEmployee[];
    } | null;
    exportDepartment: {
        image: string;
        text: string;
        employees: IContactEmployee[];
    } | null;
}

const useContactStore = defineStore('contact', {
    state: (): IContactStore => ({
        isLoading: true,
        breadcrumbs: [],
        main: null,
        tiles: null,
        saleServiceDepartment: null,
        exportDepartment: null,
    }),
    actions: {
        async fetchData() {
            this.isLoading = true;

            await import('@/data/contact').then(response => {
                this.breadcrumbs = response.default.breadcrumbs;
                this.main = response.default.main;
                this.tiles = response.default.tiles;
                this.saleServiceDepartment = response.default.saleServiceDepartment;
                this.exportDepartment = response.default.exportDepartment;
            }).finally(() => this.isLoading = false);
        },
        async fetchCustomers() {
            await import('@/data/contact').then(response => {
                this.saleServiceDepartment.employees = response.saleServiceDepartmentEmployees;
            })
        }
    }
});

export default useContactStore;