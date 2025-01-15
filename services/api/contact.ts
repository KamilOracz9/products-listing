import type { ContactPage } from "~/types/contact.types";

export const fetchContactPage = async (locale: string): Promise<ContactPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/contact`));

export const sendContactMessage = async (formData: FormData) => {
    const response = await fetch(`${useAppConfig().public.apiBase}/v1/${localeIso.value}/forms/contact`, {
        method: 'POST',
        body: formData,
    }).then(response => (response.json()));

    return response;
};