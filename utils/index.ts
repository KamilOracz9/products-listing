export const toGetParams = (params: any) => (
    Object.keys(params).map(key => {
        if (params[key]) return `${key}=${params[key]}`;
    }).filter(prop => prop).join('&')
);

export const getLocaleIso = computed(() => useI18n().locales.value.filter(locale => locale.code === useI18n().locale.value)[0].iso);