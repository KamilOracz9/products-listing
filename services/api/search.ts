import type { HeaderSearchRequest, Results } from "~/types/search.types";

export const fetchSearchResults = async (locale: string, query?: HeaderSearchRequest): Promise<Results> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/search`, {method: "POST", body: JSON.stringify(query)}));