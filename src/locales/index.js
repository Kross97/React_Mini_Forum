import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import httpApi from 'i18next-http-backend';
// import ru from './ru';
// import en from './en';
// import uk from './UkLocal';

const options = {
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'],
  cookieMinutes: 10,
  cookieDomain: 'myDomain',
  htmlTag: document.documentElement,
  checkWhitelist: true,
  cookieOptions: { path: '/' },
};


i18next
  .use(initReactI18next)
  .use(languageDetector)
  .use(httpApi)
  .init({
    lng: 'ru',
    //  whitelist: ['ru', 'uk', 'en', 'dev'],
    debug: true,
    fallbackLng: 'ru',
    // ns: ['base', 'formEdit', 'formAdd', 'dataComment'],
    defaultNS: 'base',
    // resources: {
    //  ru,
    //  en,
    //    uk,
    // },
    react: {
      useSuspense: false,
    },
    detection: options,
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18next;
