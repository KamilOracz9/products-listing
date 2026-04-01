export default defineNuxtPlugin(() => {
    const requestHost = useRequestURL().host

    const apiFetch = $fetch.create({
        onRequest({ options }) {
            options.headers = {
                ...options.headers as Record<string, string>,
                'X-Url': requestHost,
            }
        },
    })

    return {
        provide: {
            apiFetch,
        },
    }
})
