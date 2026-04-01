declare module '#app' {
    interface NuxtApp {
        $i18n: any,
        $getLocaleRoute(routeName: string): string,
        $getMapCenter(): number[],
        $isNewtrendyEU(): boolean,
        $locale: string,
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $i18n: any,
        $getLocaleRoute(routeName: string): string,
        $getMapCenter(): number[],
        $isNewtrendyEU(): boolean,
        $locale: string,
    }
}

export { }