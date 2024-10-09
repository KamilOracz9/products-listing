export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (i18n.locale.value === 'pl' && window?.location.host === 'localhost:3001') {
            return navigateTo(localePath(to.fullPath, 'en'))
        }
    },
        { global: true }
    )
})