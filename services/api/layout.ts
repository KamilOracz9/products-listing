import type { Layout } from "~/types/layout.types";

export const fetchLayoutData = async (locale: string, fetchFn: typeof $fetch = $fetch): Promise<Layout> => (await fetchFn(`${useAppConfig().public.apiBase}/v2/${locale}/cms/layout`));
