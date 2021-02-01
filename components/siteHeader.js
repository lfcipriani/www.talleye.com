export default function SiteHeader() {
  return (
    <>
      <header>
        <a href="#" className="title">
          <h1>Luis Cipriani</h1>
        </a>
        <nav>
          <ul>
            <li>
              <a href="#">About</a>
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
          a.title:hover h1 {
            text-shadow: 4px 4px 4px rgba(61, 220, 151, 0.8);
          }
          .title h1 {
            margin: 0 2rem 0 0;
            text-shadow: 2px 2px 2px rgba(61, 220, 151, 0.6);
            font-size: 2rem;
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
