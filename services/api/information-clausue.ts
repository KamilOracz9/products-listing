import type { InformationClausuePage } from "~/types/information-clausue.types";
import { getLocaleIso } from "~/utils"

export const fetchInformationClausue = async (): Promise<InformationClausuePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/information-clause`));