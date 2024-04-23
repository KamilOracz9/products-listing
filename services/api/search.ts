import type { HeaderSearchRequest, Results } from "~/types/search.types";
import { getLocaleIso } from "~/utils";

export const fetchSearchResults = async (query?: HeaderSearchRequest): Promise<Results> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/search`, {method: "POST", body: JSON.stringify(query)}));