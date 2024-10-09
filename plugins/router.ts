export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.eu') {
            return navigateTo(localePath(to.fullPath, 'en').replace('/pl', ''))
        }
    },
        { global: true }
    )
})