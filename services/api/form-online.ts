
export const fetchFormOnlinePage = async (locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/form-online`));
