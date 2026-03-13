export const fetchClipboardItems = async (ids: number[], locale: string): Promise<ClipboardItem[]> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products/clipboard`, {
    params: {
        'ids[]': ids,
    }
}));