export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (useRequestURL().host === 'newtrendy.eu' && i18n.locale.value === 'pl') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'en').replace('/pl', '')}`, { external: true, redirectCode: 301 });

        if (!['pl', 'sk'].includes(i18n.locale.value) && to.name?.split('___')[0] === 'service') {
            return navigateTo(`/${i18n.locale.value}`);
        }
    },
        { global: true }
    )
})