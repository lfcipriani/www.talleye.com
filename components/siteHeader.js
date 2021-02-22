import Link from 'next/link';

export default function SiteHeader() {
  return (
    <>
      <header>
        <Link href="/">
          <a className="title" name="top">
            <span>{process.env.NEXT_PUBLIC_SITE_TITLE}</span>
          </a>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <style jsx>
        {`
          header {
            width: 100%;
            padding: 2rem 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-end;
          }
          a.title,
          a.title:visited {
            color: var(--color-text-link);
            text-decoration: none;
          }
          a.title:hover,
          a.title:focus,
          a.title:active {
            color: var(--color-text-hover);
            text-decoration: none;
          }
          a.title:hover span {
            text-shadow: 4px 4px 4px rgba(61, 220, 151, 0.8);
          }
          .title span {
            font-family: var(--font-family-heading);
            margin: 0 2rem 0 0;
            text-shadow: 2px 2px 2px rgba(61, 220, 151, 0.6);
            font-weight: 700;
            font-size: 2rem;
            color: var(--color-text-heading);
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
            margin-left: 15px;
          }
        `}
      </style>
    </>
  );
}
