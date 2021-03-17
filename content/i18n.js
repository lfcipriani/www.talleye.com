import { useRouter } from 'next/router';

export const i18nKeys = {
  en: {
    langName: { en: 'English', 'pt-BR': 'Portuguese', de: 'German' },
    alsoAvailable: 'Also available in',
    onlyAvailable: 'Only available in',
    testEnKey: 'test',
    testFunctionKey: (age) => `I'm ${age} years old`,
  },
  'pt-BR': {
    langName: { en: 'Inglês', 'pt-BR': 'Português', de: 'Alemão' },
    alsoAvailable: 'Também disponível em',
    onlyAvailable: 'Somente disponível em',
  },
};

export default function i18n(key, locale = null) {
  const router = useRouter();
  var activeLocale = locale || router.locale;
  if (!i18nKeys[activeLocale]) {
    activeLocale = router.defaultLocale;
  }
  return i18nKeys[activeLocale][key] || i18nKeys[router.defaultLocale][key] || '';
}
