import type { ForProfessionalsPage } from "~/types/for-professionals.types";
import { getLocaleIso } from "~/utils"

export const fetchForProfessionals = async (): Promise<ForProfessionalsPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/for-professionals`));