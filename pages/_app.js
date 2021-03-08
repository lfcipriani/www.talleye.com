import '../styles/globals.css';
import '../styles/marquidaoum.css';
import 'prismjs/themes/prism-tomorrow.css';
import ThemeProvider from '../components/Theme';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (
      !sessionStorage.getItem('_swa') &&
      document.referrer.indexOf(location.protocol + '//' + location.host) !== 0
    ) {
      fetch(
        'https://counter.dev/track?' +
          new URLSearchParams({
            referrer: document.referrer,
            screen: screen.width + 'x' + screen.height,
            user: 'yrZVUWGdxFeQGcsVjpTm',
            utcoffset: '1',
          })
      );
    }
    sessionStorage.setItem('_swa', '1');
  });

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
