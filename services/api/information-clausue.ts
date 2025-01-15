import type { InformationClausuePage } from "~/types/information-clausue.types";

export const fetchInformationClausuePage = async (locale: string): Promise<InformationClausuePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/information-clause`));