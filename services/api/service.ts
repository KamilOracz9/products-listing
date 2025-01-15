export const fetchServicePage = async (locale: string) => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/service`));

export const sendServiceMessage = async (formData: FormData) => {
    const response = await fetch(`${useAppConfig().public.apiBase}/v1/pl_PL/forms/service`, {
        method: 'POST',
        body: formData,
    }).then(response => (response.json()));

    return response;
};