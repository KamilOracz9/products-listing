export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (error, instance, info) => {
        // if(process.env.NODE_ENV === 'production') clearError({ redirect: '/404' })
    })
})