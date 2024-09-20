import { Colors } from "~/enums/download";
import type { Meta } from "~/types/common.types";

export const toGetParams = (params: any) => (
    Object.keys(params).map(key => {
        if (params[key]) return `${key}=${params[key]}`;
    }).filter(prop => prop).join('&')
);

export const getLocaleIso = computed(() => {
    console.log(useI18n().locales.value)

    return useI18n().locales.value.filter(locale => locale.code === useI18n().locale.value)[0].iso;
});

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
        title: meta.meta_title ?? null,
        keywords: meta.meta_keywords ?? null,
        ogTitle: meta.meta_title ?? null,
        description: meta.meta_description ?? null,
        ogDescription: meta.meta_description ?? null,
        // title: meta.meta_title ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        // keywords: meta.meta_keywords ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        // ogTitle: meta.meta_title ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        // description: meta.meta_description ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        // ogDescription: meta.meta_description ?? 'NEW TRENDY - Producent Kabin Prysznicowych',
        // robots: {
        //     Index: meta.noindex ? !meta.noindex : true,
        //     Follow: meta.nofollow ? !meta.nofollow : true,
        // }
    })
}

export const slugify = (string: string, withSpecialChars: boolean = true): string => {
    let transformedString = String(string)
        .replace('/', '')
        .replace('`', '')
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens

    if(!withSpecialChars) transformedString = transformedString.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters

    return transformedString;
}

export const getBgColor = (color: Colors) => {
    let bgColor = '';

    switch (color) {
        case Colors.YELLOW: bgColor = '#ffce44'; break;
        case Colors.GRAY: bgColor = '#e1e1e1'; break;
    }

    return bgColor;
}

export const groupBy = (list: any, keyGetter: (item: any) => string) => {
    const map = new Map();
    list.forEach((item: any) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}