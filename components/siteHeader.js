export default function SiteHeader({ myName }) {
  return (
    <>
      <header>
        <h1>{myName}</h1>
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
