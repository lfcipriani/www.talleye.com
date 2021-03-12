import Head from 'next/head';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import ReadingTime from '../../components/ReadingTime';
import Language from '../../components/Language';
import styles from '../../styles/Post.module.css';
import { getAllContentSlugs, getContentData } from '../../lib/content';
import { useRouter } from 'next/router';

const type = 'posts';

export default function Post({ postData }) {
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
          name="og:url"
          content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
            router.locale !== router.defaultLocale ? '/' + router.locale : ''
          }${router.asPath}`}
          key="url"
        />
        <meta
          property="og:image"
          content={
            postData.image
              ? `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${postData.image}`
              : `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/ogImage.jpg`
          }
          key="image"
        />
        <meta name="keywords" content={postData.tags} key="keywords" />
        <meta name="og:type" content="post" key="type" />
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
            router.locale !== router.defaultLocale ? '/' + router.locale : ''
          }${router.asPath}`}
          key="canonical"
        ></link>
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{postData.title}</h1>
          {postData.lang !== undefined && (
            <p className={styles.articleDescription}>
              <Language lang={postData.lang} />
            </p>
          )}
          <div className={styles.subHeader}>
            <Date dateString={postData.datePublished} />
            <ReadingTime minutes={postData.readingTime} />
          </div>
        </header>
        <section
          className="marquidaoum"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllContentSlugs(type);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getContentData(type, params.slug);
  return {
    props: {
      postData,
    },
  };
}
