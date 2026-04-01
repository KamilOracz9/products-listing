export default defineNuxtPlugin((nuxtApp) => {
    const requestHost = useRequestURL().host

    nuxtApp.hook('app:created', () => {
        const originalFetch = globalThis.$fetch

        nuxtApp.$fetch = (url: string, options: Record<string, any> = {}) => {
            options.headers = {
                ...options.headers,
                'X-Url': requestHost,
            }

            return originalFetch(url, options)
        }
    })
})
