import type { PlaceToBuyPage } from "~/types/place-to-buy.types";
import { getLocaleIso } from "~/utils"

export const fetchShops = async (query: any, page: number, locationsIds?: number[]): Promise<PlaceToBuyPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/place-to-buy/shops-list?page=${page}` + `${locationsIds ? `&locationsIds=${locationsIds}` : ''}`, { query }));
export const fetchCoordsList = async (query: any, locationsIds?: number[]) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/place-to-buy/coords-list` + `${locationsIds ? `?locationsIds=${locationsIds}` : ''}`, { query }));