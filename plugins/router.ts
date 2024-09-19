export default defineNuxtPlugin(() => {
    const localePath = useLocalePath();

    addRouteMiddleware('redirect-middleware', (to, from) => {
        switch (to.name?.split('__')[0]) {
            case "categories": return navigateTo(localePath({ name: 'products', query: to.query }));
            case "categories-category": return navigateTo(localePath({ name: 'products' }) + `/${to.params.category}`);
        }

        // if(to.fullPath[to.fullPath.length - 1] !== '/' && Object.keys(to.query).length === 0) return navigateTo(`${to.fullPath}/`);
    },
        { global: true }
    )
})