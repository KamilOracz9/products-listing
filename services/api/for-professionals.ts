import type { ForProfessionalsPage } from "~/types/for-professionals.types";
import { getLocaleIso } from "~/utils"

export const fetchForProfessionalsPage = async (): Promise<ForProfessionalsPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/for-professionals`));