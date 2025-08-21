
export const fetchFilters = async (query: any, locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/newtrendy/v3/${locale}/products/filters`, { query }));
