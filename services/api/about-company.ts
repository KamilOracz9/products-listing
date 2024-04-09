import type { Breadcrumbs } from "~/types/common.types";
import { getLocaleIso } from "~/utils"

export const fetchAbout = async (): Promise<{
    breadcrumbs: Breadcrumbs;
    description: any;
    meta: any;
}> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/about-us`));