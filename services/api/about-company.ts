import type { AboutPage } from "~/types/about.types";
import { getLocaleIso } from "~/utils"

export const fetchAbout = async (): Promise<AboutPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/about-us`));