export const fetchCategory = async (slug: string, locale: string) => {
    try {
        return await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products/categories/${slug}`);
    } catch (error) {
    };
};
export const fetchProducts = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProductPage = async (slug: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products/${slug}`));
