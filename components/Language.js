export default function Language({ lang }) {
  const languages = {
    'pt-BR': 'Portuguese',
    en: 'English',
  };
  return (
    <>
      <img src={`/locales/${lang}.png`} alt="pt-BR flag" /> <em>Content in {languages[lang]}.</em>{' '}
      <style jsx>{`
        img {
          display: inline;
        }
      `}</style>
    </>
  );
}
