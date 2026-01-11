import { useRouter } from 'next/router';

export const i18nKeys = {
  // =============
  //    English
  // =============
  en: {
    langName: { en: 'English', 'pt-BR': 'Portuguese', de: 'German' },
    siteTitle: 'Luis Cipriani',
    siteDescription:
      'My Personal website with projects and articles about technology and computer science.',
    // From now on, in alphabetical order
    about: 'About',
    allPosts: 'All Posts',
    alsoAvailable: 'Also available in',
    aWebsiteBy: 'a website by',
    // eslint-disable-next-line react/display-name
    bioShortText: (work) => (
      <>
        Hi! I help engineering teams move from chaos to clarity. Working with scaling tech companies
        to align product and engineering, mentor teams to own outcomes, and eliminate the friction
        that slows everyone down. Currently CTO at {work}. Here you'll find projects I've built and
        thoughts on technology and engineering leadership.
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
    siteTitle: 'Luis Cipriani',
    siteDescription:
      'Meu site pessoal com projetos e artigos sobre tecnologia e ciência da computação.',
    // From now on, in alphabetical order
    about: 'Sobre',
    allPosts: 'Posts',
    alsoAvailable: 'Também disponível em',
    aWebsiteBy: 'um site criado por',
    // eslint-disable-next-line react/display-name
    bioShortText: (work) => (
      <>
        Olá! Eu ajudo times de engenharia a transformar caos em clareza. Trabalho com empresas de
        tecnologia em crescimento para alinhar produto e engenharia, mentorar times para que assumam
        responsabilidade pelos resultados, e eliminar os atritos que travam a operação. Atualmente
        CTO na {work}. Aqui você encontra projetos que construí e reflexões sobre tecnologia e
        liderança em engenharia.
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
  var activeLocale = 'en';
  var defaultLocale = 'en';

  if (locale && i18nKeys[locale]) {
    activeLocale = locale;
  } else {
    const router = useRouter();
    if (router && router.locale && i18nKeys[router.locale]) {
      activeLocale = router.locale;
    }
    if (router && router.defaultLocale && i18nKeys[router.defaultLocale]) {
      defaultLocale = router.defaultLocale;
    }
  }

  return i18nKeys[activeLocale][key] || i18nKeys[defaultLocale][key] || '';
}
