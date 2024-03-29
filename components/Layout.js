import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import i from '../content/i18n';

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="preload"
          href="/fonts/Lora-Bold.woff2"
          crossOrigin="anonymous"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/SourceSansPro-Regular.woff2"
          crossOrigin="anonymous"
          as="font"
          type="font/woff2"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>{i('siteTitle')} - Tall Eye</title>
        <meta name="og:title" content={`${i('siteTitle')} - Tall Eye`} key="title" />
        <meta name="description" content={i('siteDescription')} key="desc" />
        <meta name="og:description" content={i('siteDescription')} key="og-desc" />
        <meta name="author" content={i('siteTitle')} key="author" />
        <meta
          name="og:url"
          content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
            router.locale !== router.defaultLocale ? '/' + router.locale : ''
          }${router.pathname}`}
          key="url"
        />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/ogImage.jpg`}
          key="image"
        />
        <meta name="og:type" content="website" key="type" />
        <meta name="og:locale" content={router.locale} key="locale" />
        <meta name="twitter:card" content="summary" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/posts-rss.xml`}
          title="Luis Cipriani's RSS Feed - Tall Eye"
        ></link>
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
            router.locale !== router.defaultLocale ? '/' + router.locale : ''
          }${router.pathname}`}
          key="canonical"
        ></link>
      </Head>

      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
