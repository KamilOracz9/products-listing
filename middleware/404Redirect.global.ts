export default defineNuxtRouteMiddleware((to, from) => {
  if (to.matched.length === 0 || to.matched[0]?.name?.toString().includes('404__')) {
    return navigateTo('/', { redirectCode: 301 })
  }
})