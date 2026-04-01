export default defineNuxtPlugin(() => {
    const originalFetch = globalThis.$fetch
    const requestHost = useRequestURL().host

    globalThis.$fetch = (url, options = {}) => {
        const existingHeaders = options.headers instanceof Headers
            ? Object.fromEntries((options.headers as Headers).entries())
            : (options.headers ?? {});

        options.headers = {
            ...existingHeaders,
            'X-Url': requestHost,
        }

        return originalFetch(url, options)
            .then((response) => {
                return response
            })
            .catch((error) => {
                throw error
            })
    }
})
