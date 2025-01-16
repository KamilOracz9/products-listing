export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (useRequestURL().host === 'newtrendy.eu' && i18n.locale.value === 'pl') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'en').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (useRequestURL().host === 'newtrendy.de') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'de').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (useRequestURL().host === 'newtrendy.sk') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'sk').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (useRequestURL().host === 'newtrendy.ua') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'uk').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (useRequestURL().host === 'newtrendy.ro') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'ro').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (useRequestURL().host === 'newtrendy.cz') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'cs').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (useRequestURL().host === 'newtrendy.hu') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'hu').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (useRequestURL().host === 'newtrendy.et') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'et').replace('/pl', '')}`, { external: true, redirectCode: 301 });

        if (!['pl', 'sk'].includes(i18n.locale.value) && to.name?.split('___')[0] === 'service') {
            return navigateTo(`/${i18n.locale.value}`);
        }
    },
        { global: true }
    )
})