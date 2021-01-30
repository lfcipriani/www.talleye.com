export default function SiteHeader() {
  return (
    <>
      <header>
        <h1>Luis Cipriani</h1>
        <nav>
          <ul>
            <li>Articles</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <style jsx>
        {`
          header {
            width: 100%;
            margin: 20px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-end;
          }
          h1 {
            margin: 0 0 15px 0;
          }
          nav {
            margin: 0 0 15px 0;
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
