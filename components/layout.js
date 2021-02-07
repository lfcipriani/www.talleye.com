import Head from 'next/head';
import styles from './layout.module.css';
import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE} - Tall Eye</title>
        <meta
          name="description"
          content={`Personal website of ${process.env.NEXT_PUBLIC_SITE_TITLE} with projects and articles about technology and computer science.`}
        />
        <meta name="author" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <meta name="og:title" content={`${process.env.NEXT_PUBLIC_SITE_TITLE} - Tall Eye`} />
        <meta property="og:image" content={''} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
