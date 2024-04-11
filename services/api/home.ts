import type { HomePage } from "~/types/home.types";
import { getLocaleIso } from "~/utils"

export const fetchHome = async (): Promise<HomePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/home`));