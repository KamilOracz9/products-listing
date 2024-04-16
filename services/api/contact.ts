import type { ContactPage } from "~/types/contact.types";
import { getLocaleIso } from "~/utils"

export const fetchContactPage = async (): Promise<ContactPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/contact`));

export const sendContactMessage = async (formData: FormData) => {
    const response = await fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/forms/contact`, {
        method: 'POST',
        body: formData,
    }).then(response => (response.json()));

    return response;
};