import { getLocaleIso } from "~/utils"

export const fetchProducts = async (query: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products`, { query: Object.fromEntries(Object.entries(query).filter(([, value]) => value)) }));
export const fetchProductPage = async (slug: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products/${slug}`));