import { useI18n } from 'vue-i18n';

export default defineNuxtPlugin(() => {
  const useBaseUrl = () => {
    const i18n = useI18n();
    const url = useRequestURL();

    return computed(() => {
      if (process.server) {
        return i18n.locale.value === 'pl' 
          ? 'https://newtrendy.pl' 
          : 'https://newtrendy.eu';
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
