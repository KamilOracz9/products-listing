export default defineNuxtPlugin(() => {
    const originalFetch = globalThis.$fetch
    const requestHost = useRequestURL().host

    globalThis.$fetch = (url, options = {}) => {
        options.headers = {
            ...options.headers,
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
