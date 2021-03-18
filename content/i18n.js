import { useRouter } from 'next/router';

export const i18nKeys = {
  // =======
  // English
  // =======
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
        projects I built or articles I wrote about technology and software dev. I hope they are
        useful for you as much as I had fun making them. I also work as CTO at {work}.
      </>
    ),
    min: 'min',
    onlyAvailable: 'Only available in',
    scrollToTop: 'Scroll to the top of the page',
    someTermsApply: 'Some terms apply',
    testEnKey: 'test',
    testFunctionKey: (age) => `I'm ${age} years old`,
    toggleToLightTheme: 'Toggle to light theme',
    toggleToDarkTheme: 'Toggle to dark theme',
  },
  // ==========
  // Portuguese
  // ==========
  'pt-BR': {
    langName: { en: 'Inglês', 'pt-BR': 'Português', de: 'Alemão' },
    about: 'Sobre',
    allPosts: 'Todos os Posts',
    alsoAvailable: 'Também disponível em',
    aWebsiteBy: 'um site criado por',
    // eslint-disable-next-line react/display-name
    bioShortText: (name, work) => (
      <>
        Sou {name}, engenheiro de software e gerente de engenharia. Esse site é uma coleção de
        projetos que eu fiz ou artigos que escrevi sobre tecnologia ou desenvolvimento de software.
        Eu espero que eles sejam tão úteis para você como foi divertido fazê-los. Eu também sou CTO
        da {work}.
      </>
    ),
    min: 'min',
    onlyAvailable: 'Somente disponível em',
    scrollToTop: 'Vá para o topo da página',
    someTermsApply: 'Alguns direitos se aplicam',
    toggleToLightTheme: 'Mudar para o tema claro',
    toggleToDarkTheme: 'Mudar para o tema escuro',
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
