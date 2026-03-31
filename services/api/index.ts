export * from './products';

export default async function fetchData(key: string, func: () => Promise<any>, watch?: any) {
    const { data, error, pending, refresh } = await useAsyncData(key, func, watch);

    switch (error.value?.statusCode) {
        case 403: navigateTo({ path: '/' }); break;
        case 404: navigateTo({ path: '/' }); break;
        case 500: navigateTo({ path: '/' }); break;
    }

    return { data, pending, refresh };
};