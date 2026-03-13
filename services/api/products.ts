export const fetchCategory = async (slug: string, locale: string) => {
    try {
        return await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products/categories/${slug}`);
    } catch (error) {
    };
};
// export const fetchProducts = async (query: any, locale: string) => (await $fetch(`http://localhost:8000/api/newtrendy/v3/pl_PL/products`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchFilters = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/products/filters`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProducts = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/products`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProductPage = async (slug: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products/${slug}`));
