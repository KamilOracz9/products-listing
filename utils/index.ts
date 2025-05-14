import { Colors } from "~/enums/download";
import type { Meta } from "~/types/common.types";

export const toGetParams = (params: any) => (
    Object.keys(params).map(key => {
        if (params[key]) return `${key}=${params[key]}`;
    }).filter(prop => prop).join('&')
);

export const getLocaleIso = (): string => (useI18n().locales.value.filter(locale => locale.code === useI18n().locale.value)[0]?.language) ?? 'en_US';

export const localeIso = computed(() => (useI18n().locales.value.filter(locale => locale.code === useI18n().locale.value)[0].language));

export const setMeta = (meta: Meta) => {
    useSeoMeta({
        title: meta.meta_title ?? 'Producent kabin prysznicowych. Kabiny prysznicowe na wymiar | NEW TRENDY',
        keywords: meta.meta_keywords ?? null,
        ogTitle: meta.meta_title ?? null,
        description: meta.meta_description ?? null,
        ogDescription: meta.meta_description ?? null,
    })
}

export const slugify = (string: string, withSpecialChars: boolean = true): string => {
    let transformedString = String(string)
        .replace('/', '')
        .replace('`', '')
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    if (!withSpecialChars) transformedString = transformedString.replace(/[^a-z0-9 -]/g, '')

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

export const createQueryString = (query: any) => {
    return Object.keys(query).map(key => (
        Array.isArray(query[key])
            ? query[key].map((value: string | number) => (`${key}=${value}`)).join('&')
            : `${key}=${query[key]}`
    )).join('&');
}