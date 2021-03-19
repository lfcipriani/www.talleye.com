import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';
import i from '../content/i18n';

export default function FourOhFour() {
  return (
    <Layout>
      <Head>
        <title>{i('notFound')} - Tall Eye</title>
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE} - Tall Eye</title>
        <meta name="og:title" content={i('notFound') + ' - Tall Eye'} key="title" />
        <meta name="robots" content="noindex"></meta>
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{i('notFound')}</h1>
        </header>
        <section className="marquidaoum">
          <p>
            {i('notFoundText') &&
              i('notFoundText')(
                <>
                  <Link href="/" locale="en">
                    <a>home page</a>
                  </Link>
                </>
              )}
          </p>
          <div className="media">
            <iframe
              className="media-asset"
              src="https://www.youtube-nocookie.com/embed/yqzeiLg-F9g"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </article>
    </Layout>
  );
}
