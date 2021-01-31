export default function SiteHeader() {
  return (
    <>
      <footer>
        <p>Tall Eye, a website by Luis Cipriani</p>
        <p>Some terms apply</p>
        <p>RSS</p>
        <p>Light/Dark theme</p>
      </footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            border-top: 1px solid #eaeaea;
            padding: 2rem 0;
          }
          p {
            margin: 3px 0;
          }
        `}
      </style>
    </>
  );
}
