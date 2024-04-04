import { getLocaleIso } from "~/utils"

export const fetchPrivacyPolicy = async () => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/privacy-policy`));