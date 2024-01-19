type IGlobalStore = {
    locale: {
        isLoading: boolean;
        locales: {}[],
    }
}

export const useGlobalStore = defineStore('global', {
    state: (): IGlobalStore => ({
        locale: {
            isLoading: true,
            locales: [],
        }
    }),
    actions: {
        async fetchLocale() {
            this.locale.isLoading = true;

            return await import('@/data/locales')
                .then(response => {
                    this.locale.locales = response.default.locales;

                    return response.default;
                })
                .finally(() => this.locale.isLoading = false)
        },
    },
});