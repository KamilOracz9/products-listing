import { getLocaleIso } from "~/utils"

export const fetchCategory = async (slug: string) => {
    try {
        return await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products/categories/${slug}`);
    } catch (error) {
    };
};
export const fetchProducts = async (query: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProductPage = async (slug: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products/${slug}`));