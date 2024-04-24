import { getLocaleIso } from "~/utils"

export const fetchClipboardItems = async (ids: number[]): Promise<ClipboardItem[]> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/products/clipboard`, {
    params: {
        'ids[]': ids,
    }
}));