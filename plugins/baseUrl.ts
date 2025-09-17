import { useI18n } from 'vue-i18n';

export default defineNuxtPlugin(() => {
  const useBaseUrl = () => {
    const i18n = useI18n();
    const url = useRequestURL();

    return computed(() => {
      const domain = i18n.locale.value === 'pl' 
        ? 'https://newtrendy.pl' 
        : 'https://newtrendy.eu';
      
      const path = url.pathname + url.search;
      
      return {
        domain,
        fullUrl: process.server ? domain + path : url.href,
        path
      };
    });
  };

  return {
    provide: {
      baseUrl: useBaseUrl
    }
  };
});
