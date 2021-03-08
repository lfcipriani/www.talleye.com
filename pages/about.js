import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';
import Language from '../components/Language';
import { getContentData } from '../lib/content';

export default function About({ postData }) {
  return (
    <Layout>
      <Head>
        <title>
          {postData.title} - {process.env.NEXT_PUBLIC_SITE_TITLE}
        </title>
        <meta name="description" content={postData.description} />
        <meta name="keywords" content={postData.tags} />
        <meta name="author" content={postData.author} />
        <meta name="og:title" content={postData.title} />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${postData.image}`}
        />
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{postData.title}</h1>
          {postData.lang !== undefined && (
            <p className={styles.articleDescription}>
              <Language lang={postData.lang} />
            </p>
          )}
        </header>
        <section
          className="marquidaoum"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const postData = await getContentData('', 'about');
  return {
    props: {
      postData,
    },
  };
}
