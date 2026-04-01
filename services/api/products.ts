export const fetchCategory = async (slug: string, locale: string, fetchFn: typeof $fetch = $fetch) => {
    try {
        return await fetchFn(`${useAppConfig().public.apiBase}/v1/${locale}/products/categories/${slug}`);
    } catch (error) {
    };
};
// export const fetchProducts = async (query: any, locale: string, fetchFn: typeof $fetch = $fetch) => (await fetchFn(`http://localhost:8000/api/newtrendy/v3/pl_PL/products`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchFilters = async (query: any, locale: string, fetchFn: typeof $fetch = $fetch) => (await fetchFn(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/products/filters`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
// export const fetchProducts = async (query: any, locale: string, fetchFn: typeof $fetch = $fetch) => (await fetchFn(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/products`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProducts = async (query: any, locale: string, fetchFn: typeof $fetch = $fetch) => (await fetchFn(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/variants`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProductPage = async (slug: any, locale: string, fetchFn: typeof $fetch = $fetch) => (await fetchFn(`${useAppConfig().public.apiBase}/v2/${locale}/products/${slug}`));
