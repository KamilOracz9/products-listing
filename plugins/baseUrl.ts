import { useI18n } from 'vue-i18n';

export default defineNuxtPlugin(() => {
  const useBaseUrl = () => {
    const i18n = useI18n();
    const url = useRequestURL();

    return computed(() => {
      const path = url.pathname + url.search;
      if (process.server) {
        const domain = i18n.locale.value === 'pl' 
          ? 'https://newtrendy.pl' 
          : 'https://newtrendy.eu';
        return domain + path;
      }
      return url.href;
    });
  };

  return {
    provide: {
      baseUrl: useBaseUrl
    }
  };
});
