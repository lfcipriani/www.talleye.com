import { useRouter } from 'next/router';
import Link from 'next/link';
import i from '../content/i18n';

export default function Language({ lang, alternate, type, wrapper, locale }) {
  const router = useRouter();
  const activeLocale = locale || router.locale;

  function langText(locale, useDefault = locale) {
    return (
      <>
        <img src={`/locales/${locale}.png`} width="16" height="12" aria-hidden="true" />{' '}
        {i('langName', useDefault)[locale]}
        <style jsx>{`
          img {
            display: inline;
          }
        `}</style>
      </>
    );
  }

  function langMessage(text, alternates) {
    return (
      <>
        {text}{' '}
        {alternates.reduce((accu, alt) => {
          return accu === null ? [alt] : [...accu, ', ', alt];
        }, null)}
        .{' '}
      </>
    );
  }

  var text = null;
  var alternates = [];

  if (lang === activeLocale) {
    if (!alternate) {
      return null;
    } else {
      text = <>{i('alsoAvailable')}</>;
    }
  } else {
    alternates.push(langText(lang, activeLocale));
    text = <>{i('onlyAvailable')}</>;
  }
  if (alternate) {
    alternate.forEach((alt) => {
      alternates.push(
        <Link href={`${type ? `/${type}` : ''}/${alt.slug}`} locale={alt.lang}>
          <a>{langText(alt.lang)}</a>
        </Link>
      );
    });
  }

  return (
    <>
      {typeof wrapper === 'function'
        ? wrapper(langMessage(text, alternates))
        : langMessage(text, alternates)}
    </>
  );
}
