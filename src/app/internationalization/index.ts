import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cz from '../../translations/cz.json';
import de from '../../translations/de.json';
import dk from '../../translations/dk.json';
import en from '../../translations/en.json';
import es from '../../translations/es.json';
import fi from '../../translations/fi.json';
import fr from '../../translations/fr.json';
import it from '../../translations/it.json';
import se from '../../translations/se.json';

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  fi: {
    translation: fi,
  },
  cz: {
    translation: cz,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  dk: {
    translation: dk,
  },
  se: {
    translation: se,
  },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
