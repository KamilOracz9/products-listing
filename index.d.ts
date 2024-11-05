declare module '#app' {
    interface NuxtApp {
        $i18n: any,
        $getLocaleRoute(routeName: string): string,
        $getMapCenter(): number[],
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $i18n: any,
        $getLocaleRoute(routeName: string): string,
        $getMapCenter(): number[],
    }
}

export { }