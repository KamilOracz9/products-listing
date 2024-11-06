export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.eu') {
            return navigateTo(localePath(to.fullPath, 'en').replace('/pl', ''))
        }

        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.de') {
            return navigateTo(localePath(to.fullPath, 'de').replace('/pl', ''))
        }

        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.sk') {
            return navigateTo(localePath(to.fullPath, 'sk').replace('/pl', ''))
        }

        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.ro') {
            return navigateTo(localePath(to.fullPath, 'ro').replace('/pl', ''))
        }

        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.ua') {
            return navigateTo(localePath(to.fullPath, 'uk').replace('/pl', ''))
        }

        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.cz') {
            return navigateTo(localePath(to.fullPath, 'cz').replace('/pl', ''))
        }

        if (!['pl', 'sk'].includes(i18n.locale.value) && to.name?.split('___')[0] === 'service') {
            return navigateTo(`/${i18n.locale.value}`);
        }
    },
        { global: true }
    )
})