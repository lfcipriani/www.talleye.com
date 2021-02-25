import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

export default function FourOhFour() {
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
          <h1 className={styles.title}>Page not found</h1>
        </header>
        <section className="marquidaoum">
          <p>
            You can return to the{' '}
            <Link href="/">
              <a>home page</a>
            </Link>{' '}
            to find other posts or you can watch me playing piano 😁.
          </p>
          <div className="video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/yqzeiLg-F9g"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <style jsx>{`
            .video {
              position: relative;
              width: 100%;
              padding-bottom: 56.25%;
            }
            .video iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: 0;
            }
          `}</style>
        </section>
      </article>
    </Layout>
  );
}
