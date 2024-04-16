import { getLocaleIso } from "~/utils"

export const fetchServicePage = async () => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/service`));

export const sendServiceMessage = async (formData: FormData) => {
    const response = await fetch(`${useAppConfig().public.apiBase}/v1/pl_PL/forms/service`, {
        method: 'POST',
        body: formData,
    }).then(response => (response.json()));

    return response;
};