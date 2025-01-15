import type { Layout } from "~/types/layout.types";

export const fetchLayoutData = async (locale: string): Promise<Layout> => (await $fetch(`${useAppConfig().public.apiBase}/v2/${locale}/cms/layout`));
