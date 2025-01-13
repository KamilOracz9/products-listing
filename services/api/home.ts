import type { HomePage } from "~/types/home.types";
import { getLocaleIso } from "~/utils"

export const fetchHomePage = async (): Promise<HomePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/home`));