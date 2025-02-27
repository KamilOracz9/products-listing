export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.path.endsWith('/') && !to.path.includes('.') && to.name.split('__')[0] !== 'index' && from.name) {
        const { path, query, hash } = to
        const nextRoute = { path: `${path}/`, query, hash }

        return navigateTo(nextRoute, { redirectCode: 301 })
    }
})