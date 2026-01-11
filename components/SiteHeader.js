import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import RSSLink from './RSSLink';
import i from '../content/i18n';

export default function SiteHeader() {
  return (
    <>
      <header>
        <Link href="/" className="title">
          <span>{i('siteTitle')}</span>
        </Link>
        <nav>
          <ul>
            <li>
              <RSSLink size="20" />
            </li>
            <li>
              <ThemeToggle size="20" />
            </li>
            <li>
              <Link href="/about">{i('about')}</Link>
            </li>
          </ul>
        </nav>
      </header>
      <style jsx>{`
        header {
          width: 100%;
          padding: 2rem 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
        }
        nav {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }
        li + li {
          margin-left: 10px;
        }
      `}</style>
      <style jsx global>{`
        header a.title,
        header a.title:visited {
          color: var(--color-text-link);
          text-decoration: none;
        }
        header a.title:hover,
        header a.title:focus,
        header a.title:active {
          color: var(--color-text-hover);
          text-decoration: none;
        }
        header a.title:hover span {
          text-shadow: 4px 4px 4px var(--color-shadow-title);
        }
        header .title span {
          font-family: var(--font-family-heading);
          margin: 0 2rem 0 0;
          text-shadow: 2px 2px 2px var(--color-shadow-title);
          font-weight: 700;
          font-size: 2rem;
          color: var(--color-text-title);
        }
      `}</style>
    </>
  );
}
