import { DataKeys } from '~/enums/dataKeys';

export * from './filters';
export * from './products';
export * from './places-to-buy';
export * from './location';
export * from './about-company';
export * from './privacy-policy';
export * from './inspirations';
export * from './information-clausue';
export * from './contact';
export * from './for-professionals';
export * from './service';
export * from './made-to-measure';
export * from './home';
export * from './collections';

export default async function fetchData(key: DataKeys, func: () => Promise<any>, watch?: any) {
    const { data, error, pending, refresh } = await useAsyncData(key, func, watch);

    switch (error.value?.statusCode) {
        case 404: navigateTo({ path: '/' }); break;
        case 500: navigateTo({ path: '/' }); break;
    }

    return { data, pending, refresh };
};