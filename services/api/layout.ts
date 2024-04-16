import type { Layout } from "~/types/layout.types";
import { getLocaleIso } from "~/utils"

export const fetchLayoutData = async (siteId: number): Promise<Layout> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/layout?site_id=${siteId}`));