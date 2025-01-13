import type { InformationClausuePage } from "~/types/information-clausue.types";
import { getLocaleIso } from "~/utils"

export const fetchInformationClausuePage = async (): Promise<InformationClausuePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/information-clause`));