import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';
import { getContentData } from '../lib/content';
import { useRouter } from 'next/router';

export default function About({ postData }) {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>
          {postData.title} - {process.env.NEXT_PUBLIC_SITE_TITLE}
        </title>
        <meta
          name="og:title"
          content={`${postData.title} - ${process.env.NEXT_PUBLIC_SITE_TITLE}`}
          key="title"
        />
        <meta name="description" content={postData.description} key="desc" />
        <meta name="og:description" content={postData.description} key="og-desc" />
        <meta name="author" content={postData.author} key="author" />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
            router.locale !== router.defaultLocale ? '/' + router.locale : ''
          }${postData.image}`}
          key="image"
        />
        <meta name="keywords" content={postData.tags} key="keywords" />
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{postData.title}</h1>
        </header>
        <section
          className="marquidaoum"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const postData = await getContentData('', 'about', { locale: locale });
  return {
    props: {
      postData,
    },
  };
}
