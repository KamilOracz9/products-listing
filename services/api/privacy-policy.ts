import { getLocaleIso } from "~/utils"

export const fetchPrivacyPolicyPage = async () => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/privacy-policy`));