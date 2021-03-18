import i from '../content/i18n';

export default function GoToTopLink({ size }) {
  return (
    <>
      <a href="#top" title={i('scrollToTop')}>
        <span className="visually-hidden">{i('scrollToTop')}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size || '35'}
          height={size || '35'}
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
