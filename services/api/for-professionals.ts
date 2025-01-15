import type { ForProfessionalsPage } from "~/types/for-professionals.types";

export const fetchForProfessionalsPage = async (locale: string): Promise<ForProfessionalsPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/for-professionals`));
