import Head from 'next/head';
import styles from './layout.module.css';
import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';

export const siteTitle = 'Tall Eye';
export const myName = 'Luis Cipriani';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {myName} - {siteTitle}
        </title>
        <meta
          name="description"
          content={siteTitle + ' is a website with my computer science articles and projects.'}
        />
        <meta name="author" content={myName} />
        <meta property="og:image" content={''} />
        <meta name="og:title" content={myName + ' - ' + siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <SiteHeader myName={myName} />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
