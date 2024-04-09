import { getLocaleIso } from "~/utils"

export const fetchContact = async () => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/contact`));