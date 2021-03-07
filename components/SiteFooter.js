import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function SiteFooter() {
  return (
    <>
      <footer>
        <div className="footerLeft">
          <p>
            <Link href="/" locale="en">
              <a>Tall Eye</a>
            </Link>
            , a website by{' '}
            <Link href="/about" locale="en">
              <a>Luis Cipriani</a>
            </Link>
            <br />
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noreferrer nofollow"
            >
              Some terms apply
            </a>
            <br />
            Your privacy is respected. We do not track you.
          </p>
        </div>

        <div className="footerRight">
          <p>
            <Link href="/posts-rss.xml" locale="en">
              <a className="iconLink">
                <span className="visually-hidden">RSS feed</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 256 256"
                  className="svgIcon"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <path
                    d="M48,144a64,64,0,0,1,64,64"
                    fill="none"
                    stroke="#284B63"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                    className="stroke"
                  ></path>
                  <path
                    d="M48,96A112,112,0,0,1,160,208"
                    fill="none"
                    stroke="#284B63"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                    className="stroke"
                  ></path>
                  <path
                    d="M48,48A160,160,0,0,1,208,208"
                    fill="none"
                    stroke="#284B63"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                    className="stroke"
                  ></path>
                  <circle cx="52" cy="204" r="12" className="fill"></circle>
                </svg>
              </a>
            </Link>

            <ThemeToggle />

            <a href="#top" className="iconLink">
              <span className="visually-hidden">Scroll to the top of the page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="#0e1007"
                viewBox="0 0 256 256"
                className="svgIcon"
                aria-hidden="true"
                focusable="false"
              >
                <rect width="256" height="256" fill="none"></rect>
                <circle
                  cx="128"
                  cy="128"
                  r="96"
                  fill="none"
                  stroke="#0e1007"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  className="stroke"
                ></circle>
                <polyline
                  points="96 168 128 136 160 168"
                  fill="none"
                  stroke="#0e1007"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  className="stroke"
                ></polyline>
                <polyline
                  points="96 112 128 80 160 112"
                  fill="none"
                  stroke="#0e1007"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  className="stroke"
                ></polyline>
              </svg>
            </a>
          </p>
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
            margin: 3px 0;
            font-weight: 200;
            font-size: 0.8rem;
          }
          .iconLink + .iconLink {
            margin-left: 10px;
          }
          .stroke {
            stroke: var(--color-icon);
          }
          .fill {
            fill: var(--color-icon);
          }
        `}
      </style>
    </>
  );
}
