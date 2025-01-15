export const fetchVoivodeships = async (search: string, locale: string) => {
    if(search.length >= 3) return await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/location/voivodeships?search=${search}`, { search });
};

export const fetchCities = async (search: string, locale: string) => {
    if(search.length >= 3) return await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/location/cities?search=${search}`, { search });
};