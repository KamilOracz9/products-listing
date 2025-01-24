
export const fetchFilters = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/v2/${locale}/products/filters`, { query }));
