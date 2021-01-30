export default function SiteHeader() {
  return (
    <>
      <footer>
        <div className="left">
          <p>Tall Eye, a website by Luis Cipriani</p>
          <p>Some terms apply</p>
        </div>
        <div className="right">
          <p>RSS</p>
          <p>Light/Dark theme</p>
        </div>
      </footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            border-top: 1px solid #eaeaea;
          }
        `}
      </style>
    </>
  );
}
