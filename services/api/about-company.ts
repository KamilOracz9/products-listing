import type { AboutPage } from "~/types/about.types";

export const fetchAboutPage = async (locale: string): Promise<AboutPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/about-us`));
