import { getLocaleIso } from "~/utils"

export const fetchProducts = async (query: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products`, { query }));
export const fetchProductPage = async (slug: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products/${slug}`));