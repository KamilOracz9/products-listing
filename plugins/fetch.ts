export default defineNuxtPlugin(() => {
    const requestHost = useRequestURL().host

    globalThis.$fetch = $fetch.create({
        onRequest({ options }) {
            const existing = options.headers
                ? Object.fromEntries(
                    options.headers instanceof Headers
                        ? (options.headers as Headers).entries()
                        : Object.entries(options.headers as Record<string, string>)
                )
                : {};

            options.headers = {
                ...existing,
                'X-Url': requestHost,
            };
        }
    });
})
