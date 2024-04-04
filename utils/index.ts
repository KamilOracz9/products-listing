type Meta = {
    canonical_tag?: string | null;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    nofollow: boolean;
    noindex: boolean;
}

export const toGetParams = (params: any) => (
    Object.keys(params).map(key => {
        if (params[key]) return `${key}=${params[key]}`;
    }).filter(prop => prop).join('&')
);

export const getLocaleIso = computed(() => useI18n().locales.value.filter(locale => locale.code === useI18n().locale.value)[0].iso);

export const setMeta = (meta: Meta) => {
    const route = useRoute();

    useHead(() => ({
        link: [
            {
                rel: 'canonical',
                href: meta.canonical_tag ?? `https://newtrendy.pl${route.path}`,
            },
        ],
    }))

    useSeoMeta({
        title: meta.meta_title ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        keywords: meta.meta_keywords ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        ogTitle: meta.meta_title ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        description: meta.meta_description ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        ogDescription: meta.meta_description ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        robots: {
            Index: !meta.noindex ?? true,
            Follow: !meta.nofollow ?? true,
        }
    })
}

export const slugify = (string: string) => {
    return String(string)
        .replace('/', '')
        .replace('`', '')
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        // .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}