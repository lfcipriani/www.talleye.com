import Head from 'next/head';
import styles from './layout.module.css';

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

      <header className={styles.header}>
        <h1>{myName}</h1>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>A footer</footer>
    </div>
  );
}
