import Head from 'next/head';
import styles from './Layout.module.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE} - Tall Eye</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta name="author" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <meta name="og:title" content={`${process.env.NEXT_PUBLIC_SITE_TITLE} - Tall Eye`} />
        <meta property="og:image" content={''} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/posts-rss.xml`}
          title="Luis Cipriani's RSS Feed - Tall Eye"
        ></link>
      </Head>

      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
