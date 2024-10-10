export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.eu') {
            return navigateTo(localePath(to.fullPath, 'en'))
        }

        if(window?.location.host === 'newtrendy.de') return navigateTo(localePath(to.fullPath, 'de'));
        if(window?.location.host === 'newtrendy.sk') return navigateTo(localePath(to.fullPath, 'sk'));
        if(window?.location.host === 'newtrendy.ro') return navigateTo(localePath(to.fullPath, 'ro'));
        if(window?.location.host === 'newtrendy.ua') return navigateTo(localePath(to.fullPath, 'ua'));
    },
        { global: true }
    )
})