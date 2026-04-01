export default defineNuxtPlugin(() => {
    const requestHost = useRequestURL().host

    globalThis.$fetch = $fetch.create({
        headers: {
            'X-Url': requestHost,
        }
    })
})
