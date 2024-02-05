import type { IBreadCrumb, IPhoto } from '~/types';

type IAboutStore = {
    breadcrumbs: IBreadCrumb[];
    isLoading: boolean;
    story: {
        title: string;
        body: string;
        list: {
            date: string;
            text: string;
        }[];
        images: IPhoto[];
    } | null;
    sections: {
        awards: {
            body: string;
            images: string[];
        };
        career: {
            body: string;
        };
        projects: {
            bodyLeft: string;
            bodyRight: string;
        };
    } | null;
}

const useAboutStore = defineStore('about', {
    state: (): IAboutStore => ({
        breadcrumbs: [],
        isLoading: true,
        story: null,
        sections: null,
    }),
    actions: {
        async fetchData(): Promise<void> {
            this.isLoading = true;

            await import('@/data/about').then(response => {
                this.story = response.default.story;
                this.sections = response.default.sections;
                this.breadcrumbs = response.default.breadcrumbs;
            }).finally(() => this.isLoading = false)
        }
    }
});

export default useAboutStore;