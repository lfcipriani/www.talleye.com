import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import RSSLink from './RSSLink';
import GoToTopLink from './GoToTopLink';
import i from '../content/i18n';

export default function SiteFooter() {
  return (
    <>
      <footer>
        <div>
          <p>
            <Link href="/" locale="en">
              <a>Tall Eye</a>
            </Link>
            , {i('aWebsiteBy')}{' '}
            <Link href="/about" locale="en">
              <a>Luis Cipriani</a>
            </Link>
            <br />
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noreferrer nofollow"
            >
              {i('someTermsApply')}
            </a>
          </p>
        </div>

        <div>
          <ul>
            <li>
              <RSSLink />
            </li>
            <li>
              <ThemeToggle />
            </li>
            <li>
              <GoToTopLink />
            </li>
          </ul>
        </div>
      </footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            border-top: 2px solid var(--color-border-separator);
            padding: 2rem 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;
          }
          p {
            margin: 3px 0 10px;
            font-weight: 200;
            font-size: 0.8rem;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
          }
          li + li {
            margin-left: 6px;
          }
        `}
      </style>
    </>
  );
}
