import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if(!sessionStorage.getItem("_swa")&&
              document.referrer.indexOf(location.protocol+"//"+location.host)!== 0){
                fetch("https://counter.dev/track?"+
                new URLSearchParams({referrer:document.referrer,screen:screen.width+"x"+screen.height,user:"yrZVUWGdxFeQGcsVjpTm",utcoffset:"1"}))};
                sessionStorage.setItem("_swa","1");`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
