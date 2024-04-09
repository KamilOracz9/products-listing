import type { InspirationPage } from "~/types/inspirations.types";
import { getLocaleIso } from "~/utils"

export const fetchInspiration = async (slug: string): Promise<InspirationPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/articles/show/${slug}`));