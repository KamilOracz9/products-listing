export default defineNuxtPlugin(() => {
    const route = useRoute();

    return {
        provide: {
            isHomePage: (): boolean => (route.name as string)?.split('___')[0] === 'index',
        }
    }
})