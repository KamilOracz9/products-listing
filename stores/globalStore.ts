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
                label: 'Polski',
                code: 'pl',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/pl.svg',
            },
            {
                label: 'English',
                code: 'en',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/en.svg',
            },
            {
                label: 'Deutsch',
                code: 'de',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/de.svg',
            },
            // {
            //     label: 'Français',
            //     code: 'fr',
            //     flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/fr.svg',
            // },
            // {
            //     label: 'Italiano',
            //     code: 'it',
            //     flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/it.svg',
            // },
            // {
            //     label: 'Español',
            //     code: 'es',
            //     flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/es.svg',
            // },
            // {
            //     label: 'Norsk',
            //     code: 'no',
            //     flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/no.svg',
            // },
            {
                label: 'Slovenský',
                code: 'sk',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/sk.svg',
            },
            // {
                // label: 'čeština',
                // code: 'cs',
                // flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/cs.svg',
            // },
            {
                label: 'Ruminski',
                code: 'ro',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/ro.svg',
            },
            // {
            //     label: 'Русский',
            //     code: 'ru',
            //     flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/ru.svg',
            // },
            {
                label: 'українська',
                code: 'uk',
                flagUrl: 'https://newtrendy.pl/app/plugins/sitepress-multilingual-cms/res/flags/uk.svg',
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

            fetchLayoutData(1).then(response => {
                this.header = response.header;
                this.footer = response.footer;
                this.socials = response.socials;
            }).finally(() => this.isLoading = false);
        }
    },
});

export default useGlobalStore;