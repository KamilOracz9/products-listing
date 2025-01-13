import { getLocaleIso } from "~/utils"

export const fetchFormOnlinePage = async () => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/form-online`));