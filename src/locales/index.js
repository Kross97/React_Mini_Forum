import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './RuLocal';
import en from './EnLocal';
import uk from './UkLocal';

i18next
  .use(initReactI18next)
  .init({
    lng: 'ru',
    //  whitelist: ['ru', 'uk', 'en', 'dev'],
    debug: true,
    // ns: ['base', 'formEdit', 'formAdd', 'dataComment'],
    defaultNS: 'base',
    resources: {
      ru,
      en,
      uk,
    },
  });

export default i18next;
