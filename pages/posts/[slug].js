import Head from 'next/head';
import Layout from '../../components/layout';
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
        <meta name="og:title" content={`${postData.title}`} />
        <meta property="og:image" content={''} />
      </Head>
      <article>
        <header>
          <h1 className="title">{postData.title}</h1>
          <time dateTime={postData.datePublished}>{postData.datePublished}</time>
          <p>3 min reading time</p>
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
