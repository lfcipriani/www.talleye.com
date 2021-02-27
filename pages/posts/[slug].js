import Head from 'next/head';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import ReadingTime from '../../components/ReadingTime';
import styles from '../../styles/Post.module.css';
import { getAllContentSlugs, getContentData } from '../../lib/content';

export default function Post({ postData }) {
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
          content={`https://${process.env.NEXT_PUBLIC_SITE_TITLE}/${postData.image}`}
        />
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{postData.title}</h1>
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
  const paths = getAllContentSlugs('posts');
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getContentData('posts', params.slug);
  return {
    props: {
      postData,
    },
  };
}
