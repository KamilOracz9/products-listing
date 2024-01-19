import pl from './pl.json';
import en from './en.json';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    locales: ['pl', 'en'],
    messages: { pl, en }
}))