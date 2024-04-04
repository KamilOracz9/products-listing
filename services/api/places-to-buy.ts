import { getLocaleIso } from "~/utils"

export const fetchShops = async (query: any, page: number) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/place-to-buy/shops-list?page=${page}`, { query }));
export const fetchCoordsList = async (query: any) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/place-to-buy/coords-list`, { query }));