import type { IActiveLocale } from '~/types';

type IGlobalStore = {
    locale: {
        isLoading: boolean;
        locales: IActiveLocale[],
    }
}

const useGlobalStore = defineStore('global', {
    state: (): IGlobalStore => ({
        locale: {
            isLoading: true,
            locales: [],
        }
    }),
    actions: {
        async fetchLocale() {
            this.locale.isLoading = true;

            return await import('@/data/activeLocales')
                .then(response => {
                    this.locale.locales = response.default;
                })
                .finally(() => this.locale.isLoading = false)
        },
    },
});

export default useGlobalStore;