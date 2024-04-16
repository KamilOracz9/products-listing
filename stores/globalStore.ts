import { fetchLayoutData } from '~/services/api/layout';
import type { IActiveLocale } from '~/types';
import type { Footer, Header, Socials } from '~/types/layout.types';

type IGlobalStore = {
    locale: {
        isLoading: boolean;
        locales: IActiveLocale[];
    };
    header?: Header;
    footer?: Footer;
    socials?: Socials;
}

const useGlobalStore = defineStore('global', {
    state: (): IGlobalStore => ({
        locale: {
            isLoading: true,
            locales: [],
        },
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
        async fetchGlobalData() {
            const data = await fetchLayoutData(1);
            const { header, footer, socials } = data;

            this.header = header;
            this.footer = footer;
            this.socials = socials;
        }
    },
});

export default useGlobalStore;