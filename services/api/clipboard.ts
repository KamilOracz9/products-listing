import { localeIso } from "~/utils"

export const fetchClipboardItems = async (ids: number[]): Promise<ClipboardItem[]> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${localeIso.value}/products/clipboard`, {
    params: {
        'ids[]': ids,
    }
}));