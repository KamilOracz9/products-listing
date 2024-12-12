import type { AboutPage } from "~/types/about.types";
import { getLocaleIso } from "~/utils"

export const fetchAboutPage = async (): Promise<AboutPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/about-us`));