import type { HomePage } from "~/types/home.types";

export const fetchHomePage = async (locale: string): Promise<HomePage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/home`));