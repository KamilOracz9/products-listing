import { getLocaleIso } from "~/utils"

export const fetchVoivodeships = async (search: string) => {
    if(search.length >= 3) return await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/location/voivodeships?search=${search}`, { search });
};

export const fetchCities = async (search: string) => {
    if(search.length >= 3) return await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/location/cities?search=${search}`, { search });
};