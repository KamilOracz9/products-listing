export default defineNuxtPlugin(() => {
    const originalFetch = globalThis.$fetch

    globalThis.$fetch = (url, options = {}) => {
        options.headers = {
            ...options.headers,
            'X-Url': useRequestURL().host,
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
