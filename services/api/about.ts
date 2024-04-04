import { getLocaleIso } from "~/utils"

export const fetchAbout = async () => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/about-us`));