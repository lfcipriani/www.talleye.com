import '../styles/globals.css';
import '../styles/marquidaoum.css';
import 'prismjs/themes/prism-tomorrow.css';
import ThemeProvider from '../components/Theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
