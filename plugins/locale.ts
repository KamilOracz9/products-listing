export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;
    const url = useRequestURL()

    const localeRoutes: {
        [key: string]: {
            locales: string[];
            redirect: string;
        }
    } = {
        'place-to-buy': {
            locales: ['pl', 'sk'],
            redirect: localePath({ name: 'contact' }) + `#${slugify(i18n.t('export-department'))}`,
        }
    };

    const mapCenter: {
        [key: string]: number[];
    } = {
        'pl': [52.121, 19.108],
        'sk': [48.82981184541454, 19.346531896082798],
    }

    return {
        provide: {
            getLocaleRoute: (routeName: string) => (localeRoutes[routeName].locales.includes(i18n.locale.value) ? localePath({ name: routeName }) : localeRoutes[routeName].redirect),
            getMapCenter: () => (mapCenter[i18n.locale.value]),
            isNewtrendyEU: () => url.host === 'newtrendy.eu',
            isNewtrendyPL: () => url.host === 'newtrendy.newtrendy.usermd.net',
            locale: i18n.locales.value.find(item => item.code === i18n.locale.value).language,
        },
    };
})