
export const fetchFilters = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/products/filters`, { query }));
