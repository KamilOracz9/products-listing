import type { Layout } from "~/types/layout.types";
import { getLocaleIso } from "~/utils"

export const fetchLayoutData = async (): Promise<Layout> => (await $fetch(`${useAppConfig().public.apiBase}/v2/${getLocaleIso()}/cms/layout`));