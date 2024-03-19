export const toGetParams = (params: any) => (
    Object.keys(params).map(key => {
        if (params[key]) return `${key}=${params[key]}`;
    }).filter(prop => prop).join('&')
);