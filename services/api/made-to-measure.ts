import type { MadeToMeasurePage } from "~/types/made-to-measure.types";
import { getLocaleIso } from "~/utils"

export const fetchMadeToMeasurePage = async (): Promise<MadeToMeasurePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/made-to-measure`));