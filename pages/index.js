import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tall Eye - Luis Cipriani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Talleye blog</h1>

        <p className={styles.description}>a paragraph</p>
      </main>

      <footer className={styles.footer}>A footer</footer>
    </div>
  );
}
