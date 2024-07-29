import { fetchLayoutData } from '~/services/api/layout';
import type { IActiveLocale } from '~/types';
import type { Footer, Header, Socials } from '~/types/layout.types';

type IGlobalStore = {
    isLoading: boolean;
    locales: IActiveLocale[];
    header?: Header;
    footer?: Footer;
    socials: Socials;
}

const useGlobalStore = defineStore('global', {
    state: (): IGlobalStore => ({
        isLoading: true,
        locales: [
            {
                label: 'Polish',
                code: 'pl',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/pl.svg',
            },
            {
                label: 'English',
                code: 'en',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/en.svg',
            },
        ],
        socials: {
            facebook: '',
            instagram: '',
            pinterest: '',
            youtube: '',
            linkedin: '',
        },
    }),
    actions: {
        async fetchGlobalData() {
            this.isLoading = true;

            const data = fetchLayoutData(1).then(response => {
                this.header = response.header;
                this.footer = response.footer;
                this.socials = response.socials;
            }).finally(() => this.isLoading = false);
        }
    },
});

export default useGlobalStore;