export default function SiteHeader() {
  return (
    <>
      <footer>
        <div className="footerLeft">
          <p>
            Tall Eye, a website by Luis Cipriani
            <br />
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noreferrer nofollow"
            >
              Some terms apply
            </a>
            <br />
            Don't worry, you're not being tracked
          </p>
        </div>

        <div className="footerRight">
          <p>
            <a href="#" className="iconLink">
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

            <a href="#" className="iconLink">
              <span className="visually-hidden">Toggle interface theme</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="#284B63"
                viewBox="0 0 256 256"
                className="svgIcon"
                aria-hidden="true"
                focusable="false"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M88,148a68,68,0,1,1,68,68H76a44,44,0,1,1,14.30583-85.62208"
                  fill="none"
                  stroke="#284B63"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  className="stroke"
                ></path>
                <path
                  d="M46.99,138.92889A64.12919,64.12919,0,0,1,9.6218,94.37955l.00023-.001A64.0566,64.0566,0,0,0,86.37854,17.622l.00084-.00019A64.02478,64.02478,0,0,1,136,80q0,1.51431-.06961,3.01174"
                  fill="none"
                  stroke="#284B63"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  className="stroke"
                ></path>
              </svg>
            </a>
            <a href="#" className="iconLink">
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
            border-top: 2px solid var(--color-text-heading);
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
            color: var(--color-high-contrast);
          }
          .iconLink + .iconLink {
            margin-left: 10px;
          }
          .stroke {
            stroke: var(--color-text-heading);
          }
          .fill {
            fill: var(--color-text-heading);
          }
        `}
      </style>
    </>
  );
}
