export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.eu') {
            return navigateTo(localePath(to.fullPath, 'en'))
        }

        if(window?.location.host === 'newtrendy.de') i18n.setLocale('de')
        if(window?.location.host === 'newtrendy.sk') i18n.setLocale('sk');
        if(window?.location.host === 'newtrendy.ro') i18n.setLocale('ro');
        if(window?.location.host === 'newtrendy.ua') i18n.setLocale('ua');
    },
        { global: true }
    )
})