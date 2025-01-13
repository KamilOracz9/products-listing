import { fetchLayoutData } from '~/services/api/layout';
import type { IActiveLocale } from '~/types';
import type { Footer, Header, Socials } from '~/types/layout.types';

type IGlobalStore = {
    isLoading: boolean;
    locales: IActiveLocale[];
    header?: Header;
    footer?: Footer;
    socials: Socials;
    pageIsLoading: boolean,
}

const useGlobalStore = defineStore('global', {
    state: (): IGlobalStore => ({
        isLoading: true,
        locales: [
            {
                label: 'Polish',
                code: 'pl',
            },
            {
                label: 'English',
                code: 'en',
            },
            {
                label: 'German',
                code: 'de',
            },
            {
                label: 'Slovak',
                code: 'sk',
            },
            {
                label: 'Romanian',
                code: 'ro',
            },
            {
                label: 'Ukrainian',
                code: 'uk',
            },
            {
                label: 'Czech',
                code: 'cs',
            },
            {
                label: 'Hungarian',
                code: 'hu',
            },
            {
                label: 'Estonian',
                code: 'et',
            },
            {
                label: 'Lithuanian',
                code: 'lt',
            },
            {
                label: 'Latvian',
                code: 'lv',
            }
        ],
        socials: {
            facebook: '',
            instagram: '',
            pinterest: '',
            youtube: '',
            linkedin: '',
        },
        pageIsLoading: false,
    }),
    actions: {
        async fetchGlobalData() {
            this.isLoading = true;

            await fetchLayoutData().then(response => {
                this.header = response.header;
                this.footer = response.footer;
                this.socials = response.socials;
            }).finally(() => this.isLoading = false);
        },
    },
});

export default useGlobalStore;