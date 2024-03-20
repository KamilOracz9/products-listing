import { getLocaleIso } from "~/utils"

export const fetchFilters = async (query: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products/filters`, { query }));