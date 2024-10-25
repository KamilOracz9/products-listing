export default defineNuxtPlugin(() => {
    const route = useRoute();
    const url = useRequestURL();

    return {
        provide: {
            isHomePage: (): boolean => (route.name as string)?.split('___')[0] === 'index',
            canonical: (): string => (`${url.origin}${url.pathname}`),
        }
    }
})