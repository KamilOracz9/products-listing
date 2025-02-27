export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.path.endsWith('/')) {
      return navigateTo(to.path + '/', { redirectCode: 301 })
    }
  })