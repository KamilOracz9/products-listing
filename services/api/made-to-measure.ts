import type { MadeToMeasurePage } from "~/types/made-to-measure.types";

export const fetchMadeToMeasurePage = async (locale: string): Promise<MadeToMeasurePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/made-to-measure`));