import Link from 'next/link';

export default function RSSLink({ size }) {
  return (
    <>
      <Link href="/posts-rss.xml" locale="en">
        <a target="_blank" title="RSS feed">
          <span className="visually-hidden">RSS feed</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || '35'}
            height={size || '35'}
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
      <style jsx>{`
        .stroke {
          stroke: var(--color-icon);
        }
        .fill {
          fill: var(--color-icon);
        }
      `}</style>
    </>
  );
}
