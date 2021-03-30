import { useRouter } from 'next/router';

export const i18nKeys = {
  // =============
  //    English
  // =============
  en: {
    langName: { en: 'English', 'pt-BR': 'Portuguese', de: 'German' },
    about: 'About',
    allPosts: 'All Posts',
    alsoAvailable: 'Also available in',
    aWebsiteBy: 'a website by',
    // eslint-disable-next-line react/display-name
    bioShortText: (name, work) => (
      <>
        I'm {name}, software engineer and engineering manager. This website is a collection of some
        projects I built or articles I wrote about technology and software dev. I also work as CTO
        at {work}.
      </>
    ),
    min: 'min',
    notFound: 'Page not found',
    // eslint-disable-next-line react/display-name
    notFoundText: (home) => (
      <>You can return to the {home} to find other posts or relax listening some piano 😁.</>
    ),
    onlyAvailable: 'Only available in',
    scrollToTop: 'Scroll to the top of the page',
    someTermsApply: (
      <a
        href="https://creativecommons.org/licenses/by-nc/4.0/"
        target="_blank"
        rel="noreferrer nofollow"
      >
        Some terms apply
      </a>
    ),
    testEnKey: 'test',
    testFunctionKey: (age) => `I'm ${age} years old`,
    toggleToLightTheme: 'Toggle to light theme',
    toggleToDarkTheme: 'Toggle to dark theme',
  },

  // ================
  //    Portuguese
  // ================
  'pt-BR': {
    langName: { en: 'Inglês', 'pt-BR': 'Português', de: 'Alemão' },
    about: 'Sobre',
    allPosts: 'Posts',
    alsoAvailable: 'Também disponível em',
    aWebsiteBy: 'um site criado por',
    // eslint-disable-next-line react/display-name
    bioShortText: (name, work) => (
      <>
        Sou {name}, engenheiro de software e gerente de engenharia. Esse site é uma coleção de
        projetos que eu fiz ou artigos que escrevi sobre tecnologia ou desenvolvimento de software.
        Eu também sou CTO da {work}.
      </>
    ),
    min: 'min',
    notFound: 'Página não encontrada',
    // eslint-disable-next-line react/display-name
    notFoundText: (home) => (
      <>Você poder retornar à {home} para ler outros posts ou relaxe ouvindo um piano 😁.</>
    ),
    onlyAvailable: 'Somente disponível em',
    scrollToTop: 'Vá para o topo da página',
    someTermsApply: (
      <a
        href="https://creativecommons.org/licenses/by-nc/4.0/deed.pt_BR"
        target="_blank"
        rel="noreferrer nofollow"
      >
        Alguns direitos se aplicam
      </a>
    ),
    toggleToLightTheme: 'Mudar para o tema claro',
    toggleToDarkTheme: 'Mudar para o tema escuro',
  },
};

export default function i18n(key, locale = null) {
  const router = useRouter();
  var activeLocale = 'en';
  var defaultLocale = 'en';

  if (locale && i18nKeys[locale]) {
    activeLocale = locale;
  } else if (router && router.locale && i18nKeys[router.locale]) {
    activeLocale = router.locale;
  }
  if (router && router.defaultLocale && i18nKeys[router.defaultLocale]) {
    defaultLocale = router.defaultLocale;
  }

  return i18nKeys[activeLocale][key] || i18nKeys[defaultLocale][key] || '';
}
