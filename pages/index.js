import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tall Eye - Luis Cipriani</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.h1}>Tall Eye</h1>
      </header>

      <main className={styles.main}>
        <p>Welcome to mega race</p>
      </main>

      <footer className={styles.footer}>A footer</footer>
    </div>
  );
}
