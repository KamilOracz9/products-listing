export const fetchCategory = async (slug: string, locale: string) => {
    try {
        return await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products/categories/${slug}`);
    } catch (error) {
    };
};
export const fetchFilters = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/variants/filters`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProducts = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/variants`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
