export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.path.endsWith('/') && !to.path.includes('.') && to.name.split('__')[0] !== 'index') {
        return navigateTo(to.path + '/', { redirectCode: 301 })
    }
})