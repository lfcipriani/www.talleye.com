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
          }
        `}
      </style>
    </>
  );
}
