import type { MadeToMeasurePage } from "~/types/made-to-measure.types";
import { getLocaleIso } from "~/utils"

export const fetchMadeToMeasure = async (): Promise<MadeToMeasurePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/made-to-measure`));