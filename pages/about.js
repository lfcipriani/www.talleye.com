import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - {process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="Luis Cipriani" />
        <meta name="og:title" content={`About - ${process.env.NEXT_PUBLIC_SITE_TITLE}`} />
        <meta property="og:image" content="" />
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>About me</h1>
        </header>
        <section className="marquidaoum">
          <p>Hello world</p>
        </section>
      </article>
    </Layout>
  );
}
