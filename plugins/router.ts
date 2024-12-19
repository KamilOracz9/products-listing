export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();
    const nuxt = useNuxtApp();
    const i18n = nuxt.$i18n;

    addRouteMiddleware('redirect-middleware', (to, from) => {
        if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.eu') {
            return navigateTo(localePath(to.fullPath, 'en').replace('/pl', ''))
        }

        // if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.de') {
        //     return navigateTo(localePath(to.fullPath, 'de').replace('/pl', ''))
        // }

        // if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.sk') {
        //     return navigateTo(localePath(to.fullPath, 'sk').replace('/pl', ''))
        // }

        // if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.ro') {
        //     return navigateTo(localePath(to.fullPath, 'ro').replace('/pl', ''))
        // }

        // if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.ua') {
        //     return navigateTo(localePath(to.fullPath, 'uk').replace('/pl', ''))
        // }

        // if (i18n.locale.value === 'pl' && window?.location.host === 'newtrendy.cz') {
        //     return navigateTo(localePath(to.fullPath, 'cs').replace('/pl', ''))
        // }

        // if (window?.location.host === 'newtrendy.eu') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'en').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (window?.location.host === 'newtrendy.de') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'de').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (window?.location.host === 'newtrendy.sk') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'sk').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (window?.location.host === 'newtrendy.ua') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'uk').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (window?.location.host === 'newtrendy.ro') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'ro').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (window?.location.host === 'newtrendy.cz') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'cs').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (window?.location.host === 'newtrendy.hu') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'hu').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        if (window?.location.host === 'newtrendy.et') navigateTo(`https://newtrendy.eu${localePath(to.fullPath, 'et').replace('/pl', '')}`, { external: true, redirectCode: 301 });
        // if (window?.location.host === 'localhost:3002') navigateTo(`http://localhost:3000${localePath(to.fullPath, 'de').replace('/pl', '')}`, { external: true, redirectCode: 301 });

        if (!['pl', 'sk'].includes(i18n.locale.value) && to.name?.split('___')[0] === 'service') {
            return navigateTo(`/${i18n.locale.value}`);
        }
    },
        { global: true }
    )
})